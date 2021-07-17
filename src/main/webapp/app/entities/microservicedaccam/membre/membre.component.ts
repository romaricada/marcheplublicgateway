import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import {IMembre, Membre} from 'app/shared/model/microservicedaccam/membre.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MembreService } from './membre.service';
import {ConfirmationService, MessageService} from "primeng/api";
import {Acteur} from "app/shared/model/microserviceppm/acteur.model";
import {IUniteAdministrative} from "app/shared/model/microserviceppm/unite-administrative.model";
import {UniteAdministrativeService} from "app/entities/microserviceppm/unite-administrative/unite-administrative.service";
import {IJourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";

@Component({
  selector: 'jhi-membre',
  templateUrl: './membre.component.html'
})
export class MembreComponent implements OnInit, OnDestroy {
  membres: IMembre[];
  membreSelected: IMembre[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  membre: IMembre;
  display: Boolean;
  displayDelete: Boolean;
  isSaving: Boolean;
  uniteadministratives: IUniteAdministrative[];
  uniteadministrative: IUniteAdministrative;


  constructor(
    protected membreService: MembreService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected  uniteadministrativeService: UniteAdministrativeService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.membreService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IMembre[]>) => this.paginateMembres(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/membre'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/membre',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.display = false;
    this.membre = new Membre();
    this.isSaving = false;
    this.uniteadministratives = [];
    this.uniteadministrativeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJourFerier[]>) => this.paginateMembres(this.uniteadministratives=res.body, res.headers));
    this.loadAll();
    this.registerChangeInMembres();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMembre) {
    return item.id;
  }

  registerChangeInMembres() {
    this.eventSubscriber = this.eventManager.subscribe('membreListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateMembres(data: IMembre[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.membres = data;
   this.membres.forEach(m => {
      m.direction = this.uniteadministratives.find(u => u.id === m.directionId);
    });
  }
  add(membre: IMembre) {
    membre === null ? (this.membre = new Acteur()) : (this.membre = membre);
    this.display = true;
  }
  supprimer() {
    this.displayDelete = true;
  }
  annulerDelete() {
    this.membre = new Membre();
    this.displayDelete = false;
  }
  deleteElement(membre: IMembre) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (membre === null) {
          return;
        } else {
          membre.deleted = true;
          this.membreService.update(membre).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }
  annuler() {
    this.membre = new Membre();
    this.display = false;
  }
  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
    //  this.membre.id = this.membre.id;
      if (this.membre.id !== undefined) {
        this.subscribeToSaveResponse(this.membreService.update(this.membre));
      } else {
        this.subscribeToSaveResponse(this.membreService.create(this.membre));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Un membre avec le  même libéllé existe déjà !');
    }
  }
  deleteAll() {
    this.membreService.deleteAll(this.membreSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
  }
  protected onSaveError() {
    this.isSaving = false;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembre>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Un membre ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  ifExist(): boolean {
    if (this.membre.id !== undefined) {
      return this.membres.some(value => value.id !== this.membre.id && value.email ===this.membre.email );
    } else {
      return this.membres.some(value => value.email ===this.membre.email );
    }
  }
  loadUniteAdministrative() {
    this.membreService.findMembreByUnite(this.getuniteId()).subscribe((res: HttpResponse<IMembre[]>) => {
      this.membres = res.body;
    });

  }
  getuniteId(): number {
    if (this.uniteadministrative !== null) {
      return this.uniteadministrative.id;
    } else {
      return 0;
    }
  }
  findUniteById(id: number): IUniteAdministrative {
    return this.uniteadministratives.find(value => value.id === id);
  }


}

