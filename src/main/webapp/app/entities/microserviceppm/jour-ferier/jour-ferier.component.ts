import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import {IJourFerier, JourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";
import {JourFerierService} from "app/entities/microserviceppm/jour-ferier/jour-ferier.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import * as moment from 'moment';

@Component({
  selector: 'jhi-jour-ferier',
  templateUrl: './jour-ferier.component.html',
  styleUrls: ['./jour-ferier.component.scss']
})
export class JourFerierComponent implements OnInit, OnDestroy {
  joursFeriers: IJourFerier[];
  jourFerierSelected: IJourFerier[];
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
  display: Boolean;
  isSaving: Boolean;
  jourFerier: IJourFerier;
  exercicebudgetaires: IExerciceBudgetaire[];
  displayDelete: Boolean;
  displaych: Boolean;
  date: Date;
  fonctionnalite = 'gestion des jours fériés';

  constructor(
    protected jourFerierService: JourFerierService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected exerciebugetaireService: ExerciceBudgetaireService
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
    this.jourFerierService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJourFerier[]>) => this.paginateJoursfeirier(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/jour-ferier'], {
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

      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.display = false;
    this.jourFerier = new JourFerier();
    this.joursFeriers = [];
    this.date=new Date();
    this.isSaving = false;
    this.displaych = false;
    this.exercicebudgetaires = [];
    this.exerciebugetaireService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IJourFerier[]>) => this.paginateJoursfeirier(this.exercicebudgetaires=res.body, res.headers));
    this.loadAll();
    this.registerChangeInEtapes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IJourFerier) {
    return item.id;
  }

  registerChangeInEtapes() {
    this.eventSubscriber = this.eventManager.subscribe('jourFerierListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  add(jourFerier: IJourFerier) {
    if(jourFerier === null){
      this.jourFerier = new JourFerier();
    }
    else {
      this.jourFerier=jourFerier;
      window.console.log('==========================================');

      window.console.log(this.jourFerier.jour);
    }
    this.display = true;
  }
  save() {
      this.isSaving = true;
      this.jourFerier.jour = moment(this.date);
      if (this.jourFerier.id !== undefined) {
        this.subscribeToSaveResponse(this.jourFerierService.update(this.jourFerier));
      } else {
        this.subscribeToSaveResponse(this.jourFerierService.create(this.jourFerier));
      }
  }

  protected paginateJoursfeirier(data: IJourFerier[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.joursFeriers = data;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJourFerier>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Un jour ferier ajouté avec succès!');
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
    this.jourFerier = new JourFerier();
    this.display = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.jourFerierService.deleteAll(this.jourFerierSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  annulerDelete() {
    this.jourFerier = new JourFerier();
    this.displayDelete = false;
  }

  deleteElement(jourFerier: IJourFerier) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (jourFerier === null) {
          return;
        } else {
          jourFerier.deleted = true;
          this.jourFerierService.update(jourFerier).subscribe(
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
  ifExist(): boolean {
    if (this.jourFerier.id) {
      return this.joursFeriers.some(value => value.id !== this.jourFerier.id && value.libelle === this.jourFerier.libelle);
    } else {
      return this.joursFeriers.some(value => value.libelle === this.jourFerier.libelle);
    }
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
}
