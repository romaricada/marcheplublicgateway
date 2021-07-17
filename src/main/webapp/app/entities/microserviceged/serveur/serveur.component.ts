import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IServeur, Serveur} from 'app/shared/model/microserviceged/serveur.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ServeurService } from './serveur.service';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'jhi-serveur',
  templateUrl: './serveur.component.html'
})
export class ServeurComponent implements OnInit {
  serveurs: IServeur[];
   serveur : IServeur;
   serveurSelected : IServeur[];
  displayDelete: Boolean;
  error: any;
  passvisible = false;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  motPasse : string;
  links: any;
  isSaving: Boolean;
  totalItems: any;
  display: Boolean;
  displayAdd: boolean;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;

  reverse: any;

  constructor(
    protected serveurService: ServeurService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected router: Router,
    protected eventManager: JhiEventManager
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
    this.serveurService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IServeur[]>) => this.paginateServeurs(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/serveur'], {
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
      '/serveur',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  supprimer() {
    this.displayDelete = true;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServeur>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'serveur ajouté avec succès!');
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
  handleVisibility() {
    this.passvisible = !this.passvisible;
  }



  protected onSaveError() {
    this.isSaving = false;
  }
  ngOnInit() {
    this.loadAll();
    this.isSaving = false;
    this.isSaving = false;
    this.displayAdd= false;
    this.serveur = new Serveur();
    this.displayDelete = false;
    this.serveurSelected = [] ;
    this.registerChangeInServeurs();
  }


  trackId(index: number, item: IServeur) {
    return item.id;
  }

  registerChangeInServeurs() {
    this.eventSubscriber = this.eventManager.subscribe('serveurListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  add(serveur: IServeur) {
    serveur === null ? (this.serveur = new Serveur()) : (this.serveur = serveur);
    this.display = true;
  }
  annuler() {
    this.serveur = new Serveur();
    this.display = false;
    this.loadAll();
  }
  annulerDelete() {
    this.displayDelete = false;
  }
  deleteAll() {
    this.serveurService.deleteAll(this.serveurSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }

    save() {
      if (!this.ifExist()) {
        this.isSaving = true;
        this.serveur.active = true;

        if (this.serveur.id !== undefined) {
          this.subscribeToSaveResponse(this.serveurService.update(this.serveur));
          this.displayAdd = false;
        } else {

          this.subscribeToSaveResponse(this.serveurService.create(this.serveur));
          this.displayAdd = false;
        }
      } else {
        this.showMessage('error', 'ENREGISTREMENT', 'ce serveur existe déjà !');
      }

      this.loadAll();
    }


    ifExist(): boolean {
    if (this.serveur.id) {
      return this.serveurs.some(
        value =>
          value.id !== this.serveur.id &&
          value.nomServeur === this.serveur.nomServeur &&
          value.adresse === this.serveur.adresse &&
          value.typeServeur === this.serveur.typeServeur &&
          value.port === this.serveur.port &&
          value.motPasse === this.serveur.motPasse

      );
    } else {
      return this.serveurs.some(value => value.nomServeur === this.serveur.nomServeur);
    }
  }


  deleteElement(serveur: IServeur) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (serveur === null) {
          return;
        } else {
          serveur.deleted = true;
          this.serveurService.update(serveur).subscribe(
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

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  protected paginateServeurs(data: IServeur[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.serveurs = data;
  }
  handleChange(serveur: IServeur) {
    this.serveurService.changeStatus(serveur).subscribe(() => {this.loadAll()})
  }

}
