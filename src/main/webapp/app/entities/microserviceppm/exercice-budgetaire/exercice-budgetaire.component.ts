import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ExerciceBudgetaire, IExerciceBudgetaire } from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

import { ConfirmationService, MessageService } from 'primeng/api';

import { ExerciceBudgetaireService } from './exercice-budgetaire.service';

@Component({
  selector: 'jhi-exercice-budgetaire',
  templateUrl: './exercice-budgetaire.component.html',
  styleUrls: ['./execice-budgetaire.component.scss'],
  providers: [MessageService]
})
export class ExerciceBudgetaireComponent implements OnInit, OnDestroy {
  exerciceBudgetaires: IExerciceBudgetaire[];
  exerciceBudgetaireSelected: IExerciceBudgetaire[];
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
  exercice: IExerciceBudgetaire;
  display: Boolean;
  isSaving: Boolean;
  displayDelete: Boolean;
  modal= '';

  constructor(
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
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
    this.exerciceBudgetaireService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => this.paginateExerciceBudgetaires(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/exercice-budgetaire'], {
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
      '/exercice-budgetaire',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.exerciceBudgetaireSelected = [];
    this.display = false;
    this.isSaving = false;
    this.displayDelete = false;
    this.exercice = new ExerciceBudgetaire();
    this.loadAll();
    this.registerChangeInExerciceBudgetaires();
  }

  add(exercice: IExerciceBudgetaire) {
    exercice === null ?
      (this.exercice = new ExerciceBudgetaire(), this.modal = 'ajouter')
      : (this.exercice = exercice, this.modal = 'modifier');
    this.display = true;
  }

  annuler() {
    this.exercice = new ExerciceBudgetaire();
    this.loadAll();
    this.display = false;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExerciceBudgetaire) {
    return item.id;
  }

  registerChangeInExerciceBudgetaires() {
    this.eventSubscriber = this.eventManager.subscribe('exerciceBudgetaireListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateExerciceBudgetaires(data: IExerciceBudgetaire[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.exerciceBudgetaires = data;
  }

  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.exercice.id !== undefined) {
        this.subscribeToSaveResponse(this.exerciceBudgetaireService.update(this.exercice));
      } else {
        this.subscribeToSaveResponse(this.exerciceBudgetaireService.create(this.exercice));
      }
    } else {
      this.showMessage('myKey1','error', 'ENREGISTREMENT', 'Un exercice avec la  même année existe déjà !');
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExerciceBudgetaire>>) {
    result.subscribe(
      () => {
        this.showMessage('myKey1','success', 'ENREGISTREMENT', 'Exercice ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('myKey1','error', 'ENREGISTREMENT', "Echec d'enregistrement!");
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

  supprimer() {
    this.displayDelete = true;
    this.exerciceBudgetaireSelected.forEach(item => {
      if (item.elaborer || item.active) {
        this.displayDelete = false;
      }
    });
    if (!this.displayDelete) {
      this.showMessage('myKey2','error', 'SUPPRESSION', "Vous ne pouvez pas supprimer la lites sélectionnée !");
    }
    // this.displayDelete = true;
  }
  annulerDelete() {
    this.exerciceBudgetaireSelected = [];
    this.displayDelete = false;
  }
  /* deleteAll() {
    this.exerciceBudgetaireSelected.forEach(exercice => {
      exercice.deleted = true;
    });
  } */
  deleteAll() {
    this.exerciceBudgetaireService.deleteAll(this.exerciceBudgetaireSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('myKey1','success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('myKey1','error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }

  ifExist(): boolean {
    if (this.exercice.id) {
      return this.exerciceBudgetaires.some(value => value.id !== this.exercice.id && value.annee === this.exercice.annee);
    } else {
      return this.exerciceBudgetaires.some(value => value.annee === this.exercice.annee);
    }
  }

  deleteElement(exercie: IExerciceBudgetaire) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (exercie === null) {
          return;
        } else {
          exercie.deleted = true;
          this.exerciceBudgetaireService.update(exercie).subscribe(
            () => {
              this.loadAll();
              this.showMessage('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('myKey1', 'error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

  showMessage(cle: string, sever: string, sum: string, det: string) {
    this.messageService.add({
      key: cle,
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  handleChange(exercice: IExerciceBudgetaire) {
    this.exerciceBudgetaireService.changeStatus(exercice).subscribe(() => {
      this.loadAll();
    });
  }

  handleChangeElaborer(exercice: IExerciceBudgetaire) {
    this.exerciceBudgetaireService.changeElaborerPPM(exercice).subscribe(() => {
      this.loadAll();
    });
  }

  getAnnee(): number {
    return new Date().getFullYear();
  }

  verifierAnnee() {
    if (this.exercice.annee !== null) {
      if (this.exercice.annee >= this.getAnnee() && this.exercice.annee <= this.getAnnee() + 1) {
        window.console.log('-----valide------');
        this.isSaving = false;
      } else {
        this.showMessage('myKey1','error', 'Année invalide', 'Exercice budgéraire');
        this.isSaving = true;
      }
    } else {
      window.console.log('-----invalide------');
    }
  }
}
