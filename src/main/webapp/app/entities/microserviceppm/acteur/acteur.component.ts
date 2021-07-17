import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { Acteur, IActeur } from 'app/shared/model/microserviceppm/acteur.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ActeurService } from './acteur.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import {UserService} from "app/core/user/user.service";

@Component({
  selector: 'jhi-acteur',
  templateUrl: './acteur.component.html',
  styleUrls: ['./acteur.component.scss']
})
export class ActeurComponent implements OnInit, OnDestroy {
  acteurs: IActeur[];
  acteurSelected: IActeur[];
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
  acteur: IActeur;
  display: Boolean;
  isSaving: Boolean;
  displayDelete: Boolean;
  users: Account[];
  user: Account;
  blockSpecial = /^[^<>*!%£=+!/$£#@azertyuiopqsdfghjklmwxcvbn,;:]+$/;
  modal = '';

  constructor(
    protected acteurService: ActeurService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected userService: UserService
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
    this.acteurService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IActeur[]>) => this.paginateActeurs(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/acteur'], {
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
      '/acteur',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.isSaving = false;
    this.display = false;
    this.acteur = new Acteur();
    this.loadAll();
    this.getAllUser();
    this.registerChangeInActeurs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IActeur) {
    return item.id;
  }

  registerChangeInActeurs() {
    this.eventSubscriber = this.eventManager.subscribe('acteurListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateActeurs(data: IActeur[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.acteurs = data;
  }

  add(acteur: IActeur) {
    if (acteur === null) {
      this.acteur = new Acteur();
      this.modal = 'ajouter';
    } else {
      this.acteur = acteur;
      this.modal = 'modifier';
      this.user = this.users.find(u => parseInt(u.id, 10) === acteur.userId);
    }
    this.display = true;
  }

  save() {
    this.acteur.userId = parseInt(this.acteur.user.id, 10);
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.acteur.id !== undefined) {
        this.subscribeToSaveResponse(this.acteurService.update(this.acteur));
      } else {
        this.subscribeToSaveResponse(this.acteurService.create(this.acteur));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Un acteur avec le  même libéllé existe déjà !');
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActeur>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Un acteur ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  annuler() {
    this.acteur = new Acteur();
    this.display = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.acteurService.deleteAll(this.acteurSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  ifExist(): boolean {
    if (this.acteur.id) {
      return this.acteurs.some(value => value.id !== this.acteur.id && value.libelle === this.acteur.libelle);
    } else {
      return this.acteurs.some(value => value.libelle === this.acteur.libelle);
    }
  }
  deleteElement(acteur: IActeur) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (acteur === null) {
          return;
        } else {
          acteur.deleted = true;
          this.acteurService.update(acteur).subscribe(
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
  annulerDelete() {
    this.acteur = new Acteur();
    this.displayDelete = false;
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  getAllUser(): void {
    this.userService.getAllUsers().subscribe(
      (res: HttpResponse<any[]>) => this.users = res.body
    );
  }
}
