import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {Contentieux, IContentieux} from 'app/shared/model/microserviceexecution/contentieux.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ContentieuxService } from './contentieux.service';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {LotService} from 'app/entities/microservicedaccam/lot/lot.service';
import {ContratService} from 'app/entities/microserviceexecution/contrat/contrat.service';
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {IReclamationCandidatLot} from "app/shared/model/microservicedaccam/reclamation-candidat-lot.model";
import {
  DecisionContentieux,
  IDecisionContentieux
} from "app/shared/model/microserviceexecution/decision-contentieux.model";
import {DecisionContentieuxService} from "app/entities/microserviceexecution/decision-contentieux/decision-contentieux.service";
import {takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {State} from "app/store/reducers";

@Component({
  selector: 'jhi-contentieux',
  templateUrl: './contentieux.component.html'
})
export class ContentieuxComponent implements OnInit, OnDestroy {
  contentieuxes: IContentieux[];
  contentieux: IContentieux;
  contentieuxTMP: IContentieux;
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
  activite: IActivite;
  activites: IActivite[];
  exercice: IExerciceBudgetaire;
  exercices: IExerciceBudgetaire[];
  lot: ILot;
  lots:ILot[];
  contentieuxSelecteds: IContentieux[];
  display: boolean;
  contrats: IContrat[];
  isSaving: boolean;
  contrat: IContrat;
  reclamationCandidatLots: IReclamationCandidatLot[];
  displayDecisionModal: boolean;
  decisionContentieuxisUpdate: boolean;
  index: number;
  decisionContentieuxes: IDecisionContentieux[];
  decisionContentieux: IDecisionContentieux;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isContentieux: boolean;

  constructor(
    protected contentieuxService: ContentieuxService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activiteService: ActiviteService,
    protected exerciceService: ExerciceBudgetaireService,
    protected jhiAlertService: JhiAlertService,
    protected lotService: LotService,
    protected contratService: ContratService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected decisionContentieuxService: DecisionContentieuxService,
    protected store: Store<State>

  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  listeDecision(){
     this.decisionContentieuxService.query().subscribe((res: HttpResponse<IDecisionContentieux[]>)=>{
       this.decisionContentieuxes = res.body;
     });

  }
  annulerDecision(){
    this.displayDecisionModal=false;
  }

  loadAll() {
    this.contentieuxService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IContentieux[]>) => {
        this.paginateContentieuxes(res.body, res.headers);
        this.contentieuxes = res.body;
      });
  }

  loadAllDecision() {
    this.decisionContentieuxService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IDecisionContentieux[]>) => {
        this.paginateDecisionContentieux(res.body, res.headers);
        this.contentieuxes = res.body;
      });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/contentieux'], {
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
      '/contentieux',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  supprimer(contentieutmp:IContentieux){
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (contentieutmp === null) {
          return;
        } else{
          contentieutmp.deleted = true;
          this.contentieuxService.delete(contentieutmp.id).subscribe(
            () => {
              this.loadAll();
              this.showMessage( 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage( 'error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

  loadPenalitebyLiquidation(){
    this.decisionContentieuxService.findDecisionContentieuxbyContentieux(this.contentieux.id).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<IDecisionContentieux[]>)=>{
      this.contentieux.decisionContentieuxes = res.body;
    })
  }

  afficherDecision(){
    if (this.contentieux.typeIncidentExecution.toString() === 'CONTENTIEUX') {
      this.isContentieux = true;
    }

  }

  ngOnInit() {
    this.isContentieux = false;
    this.registerChangeInContentieuxes();
    this.init();
    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();
          this.findAllContratbyExerceId();
        }
      });
    this.listeDecision();
    this.loadAll();
  }

  actualisation() {
    this.contrats = [];
  }

  showModal() {
    this.displayDecisionModal = true;
    this.isSaving = false;
  }

  init () {
    // this.loadAllExercice();
    this.contentieux = new Contentieux();
    this.contentieux.decisionContentieux = new DecisionContentieux();
    this.decisionContentieux = new DecisionContentieux();
    this.loadAllDecision();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IContentieux) {
    return item.id;
  }

  registerChangeInContentieuxes() {
    this.eventSubscriber = this.eventManager.subscribe('contentieuxListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  findAllContratbyExerceId(){
    this.contratService.findAllContratByExerceId(this.exercice.id).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IContrat[]>) => {
        this.contrats = res.body;
        window.console.log("========{contrat}========", this.contrats);
      });
  }

  protected paginateContentieuxes(data: IContentieux[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.contentieuxes = data;
  }
  protected paginateDecisionContentieux(data: IDecisionContentieux[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.decisionContentieuxes = data;
  }

  findContentieuxByContrat(){
    this.contentieuxService.findContentieuxByContrat(this.contrat.id).subscribe((res: HttpResponse<IContentieux[]>) =>{
      this.contentieuxes = res.body;
    });
  }




  loadAllExercice() {
    this.exerciceService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
      this.exercices = res.body;
    });
  }

  exerciciceChange() {
    this.activiteService.findAllByAnneeExercice(this.getExerciceId()).subscribe((res: HttpResponse<IActivite[]>) => {
      if (res.body.length > 0) {
        res.body.forEach(value => {
          value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
        });
      }
      this.activites = res.body;
    });
  }

  getExerciceId(): number {
    if (this.exercice !== null) {
      return this.exercice.id;
    } else {
      return 0;
    }
  }


  ajoutContentieux() {
    this.contentieux = new Contentieux();
    this.contentieux.decisionContentieux = new DecisionContentieux();
    this.display = true;
  }

  updateContentieux(contentieux: IContentieux) {
    this.decisionContentieuxisUpdate = true;
    this.contentieux = contentieux;
    this.loadPenalitebyLiquidation();
    this.display = true;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
  previousState() {
    this.display = false;
  }
  annuler() {
    this.display = false;
  }

  save() {
    this.isSaving = true;
    this.contentieux.contratId = this.contrat.id;
    this.contentieux.decisionContentieux = this.decisionContentieux;
    this.contentieux.decisionContentieux.contentieuxId = this.contentieux.id;
    this.contentieux.decisionContentieuxId = this.decisionContentieux.id;
    if (this.contentieux.id !== undefined) {
      this.subscribeToSaveResponse(this.contentieuxService.update(this.contentieux));
      this.findContentieuxByContrat();
      this.loadAll();
      this.decisionContentieux = new DecisionContentieux();
    } else {
      this.subscribeToSaveResponse(this.contentieuxService.create(this.contentieux));
      this.findContentieuxByContrat();
      this.loadAll();
      this.decisionContentieux = new DecisionContentieux();
    }

  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentieux>>) {
    result.subscribe(() => {
      this.showMessage( 'success', 'ENREGISTREMENT', 'Contentieux ajouté avec succès!!!');
      this.onSaveSuccess()
    }, () => {
      this.showMessage('error', 'ENREGISTREMENT', "Echec de l'enregistrement!!!");
      this.onSaveError()
    });
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  protected onSaveError() {
    this.isSaving = false;
    this.display = false;
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
  }
  /* filterContrat (){
    this.contratService
  } */
  validerDecision() {
    if (!this.contentieux.decisionContentieuxes) {
      this.contentieux.decisionContentieuxes = [];
    }
    if (this.decisionContentieuxisUpdate){
      this.decisionContentieuxisUpdate = false;
      this.contentieux.decisionContentieuxes.splice(this.index,1);
      this.contentieux.decisionContentieuxes.push(this.decisionContentieux);
    }
    else {
      this.contentieux.decisionContentieuxes.push(this.decisionContentieux);

    }
    this.displayDecisionModal = false;
  }

  modif(decisionContentieux: IDecisionContentieux){
    this.decisionContentieuxisUpdate = true;
    this.decisionContentieux = decisionContentieux;
    this.displayDecisionModal = true;
  }
  retirer(index){
    this.contentieux.decisionContentieuxes.splice(index,1);
  }

}
