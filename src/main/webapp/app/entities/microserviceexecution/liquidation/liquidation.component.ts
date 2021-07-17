import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import {ILiquidation, Liquidation} from 'app/shared/model/microserviceexecution/liquidation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { LiquidationService } from './liquidation.service';
import {takeUntil} from "rxjs/operators";
import {IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {State} from "app/store/reducers";
import {IPenalite, Penalite} from "app/shared/model/microserviceexecution/penalite.model";
import {ConfirmationService, MessageService, SelectItem} from "primeng/api";
import {PenaliteService} from "app/entities/microserviceexecution/penalite/penalite.service";
import {WordFlow} from "app/shared/model/microserviceexecution/word-flow";
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {IBesoinLigneBudgetaire} from "app/shared/model/microserviceppm/besoin-ligne-budgetaire.model";
import {ILigneBudgetaireContrat} from "app/shared/model/microserviceexecution/ligne-budgetaire-contrat.model";
import {messageWordFlow} from "app/shared/util/message-wordflow";
import {IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {EngagementService} from "app/entities/microserviceexecution/engagement/engagement.service";
import {ReportService} from "app/entities/microserviceexecution/reports/reportService";

@Component({
  selector: 'jhi-liquidation',
  templateUrl: './liquidation.component.html'
})
export class LiquidationComponent implements OnInit, OnDestroy {
  liquidations: ILiquidation[];
  liquidationsTMP: ILiquidation[];
  liquidationSelected: ILiquidation[];
  liquidationSelect: ILiquidation;
  liquidation: ILiquidation;
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
  exercices: IExerciceBudgetaire[];
  activite: IActivite;
  activites: IActivite[];
  lots: ILot[];
  lot: ILot;
  display: boolean;
  isSaving: boolean;
  displayPenalite: boolean;
  contrat: IContrat;
  contrats: IContrat[];
  avisdac: IAvisDac;
  avisdacs: IAvisDac[];
  penalites: IPenalite[];
  penalite: IPenalite;
  penaliteTMP: IPenalite;
  ligneBudget: ILigneBudgetaire;
  besoinLigneBudgetaire: IBesoinLigneBudgetaire;
  besoinLigneBudgetaires: ILigneBudgetaireContrat[];
  engagements: IEngagement[];
  engagement: IEngagement;
  ligneSelect: ILigneBudgetaireContrat;
  index:number;
  penaliteisUpdate: boolean;
  isPaiement: boolean;
  isOrdonateur: boolean;
  isControl: boolean;
  displayDelete: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  liquidationCreation: Array<SelectItem>;
  liquidationControle: Array<SelectItem>;
  liquidationOrdonateur: Array<SelectItem>;
  liquidationDuPaiement: Array<SelectItem>;


  constructor(
    protected liquidationService: LiquidationService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activiteService: ActiviteService,
    protected contratService: ContratService,
    protected lotService: LotService,
    protected penaliteService: PenaliteService,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected engagementService: EngagementService,
    protected reportService: ReportService,
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

  loadAll() {
    this.liquidationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ILiquidation[]>) => this.paginateLiquidations(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/liquidation'], {
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
      '/liquidation',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.liquidations =[];
    this.liquidationsTMP =[];
    this.liquidation = new Liquidation();
    this.penalites = [];
    this.penalite = new Penalite();
    this.liquidation.penalite = new Penalite();
    // this.loadAll();
    this.registerChangeInLiquidations();
    this.exerciceBudgetaireService.findAllWithoutPage().pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
        this.exercices = res.body;
      });
    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();
          this.findAllContratbyExerceId();
        }
      });

  }

  getAvisdacId(): number {
    if (this.avisdac !== null) {
      return this.avisdac.id;
    } else {
      return 0;
    }
  }

  supprimer(){
    this.displayDelete = true;
  }

  annulerDelete(){
    this.displayDelete = false;
  }

  deleteAll() {
    this.liquidationService.deleteAll(this.liquidationSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('myKey', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('myKey', 'error', 'SUPPRESSION', 'Echec de la suppression !')
    );
  }

  showPenalite(){
    this.penalite = new Penalite();
    this.displayPenalite = true;
  }

  AnnullerLiquidation(){
    this.display = false;
  }

  AnnullerPenalite(){
    this.displayPenalite = false;
  }

  findAllContratbyExerceId(){
    this.contratService.findAllContratByExerceId(this.exercice.id).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IContrat[]>) => {
        this.contrats = res.body;
      });
  }

  findAllEngagementbyContrat(){
    this.engagementService.findAllBycontrat(this.contrat.id).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<IEngagement[]>) => {
        this.engagements = res.body;
        window.console.log("====engagement===={}", this.engagements);
      });

  }

  loadLiquidationbyEngagement(){
    this.liquidationService.findLiquidationByEngagement(this.engagement.id).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<ILiquidation[]>)=>{
      this.liquidations = res.body.filter(value => value.engagementId === this.engagement.id);
      window.console.log("====liquidations===={}", this.liquidations);
      this.liquidationCreation = [];
      this.liquidationControle = [];
      this.liquidationOrdonateur = [];
      this.liquidationDuPaiement = [];
      this.liquidations.forEach(value => {
        value.etapeLiquidation = messageWordFlow(value.wordFlow);
        if (value.wordFlow === WordFlow.CREATION_LIQUIDATION) {
          this.liquidationCreation.push({label: value.referencePaiement, value: value.id});
        }
        if (value.wordFlow === WordFlow.VISA_LIQ_CONTROLEUR) {
          this.liquidationControle.push({label: value.referencePaiement, value: value.id});
        }
        if (value.wordFlow === WordFlow.VISA_LIQ_ORDONNATEUR) {
          this.liquidationOrdonateur.push({label: value.referencePaiement, value: value.id});
        }
        if (value.wordFlow === WordFlow.LIQUIDER) {
          this.liquidationDuPaiement.push({label: value.referencePaiement, value: value.id});
        }
      });
    })
  }

  loadPenalitebyLiquidation(){
    this.penaliteService.findPenaliteByLiquidation(this.liquidation.id).pipe(takeUntil(this.destroy$)).subscribe((res:HttpResponse<IPenalite[]>)=>{
      this.liquidation.penalites = res.body;
    })
  }

  actualisation() {
    this.contrats = [];
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILiquidation) {
    return item.id;
  }

  registerChangeInLiquidations() {
    this.eventSubscriber = this.eventManager.subscribe('liquidationListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  addLiquidation(liquidation: ILiquidation){
    liquidation === null ? (this.liquidation = new Liquidation()):(this.liquidation = liquidation);
    this.loadPenalitebyLiquidation();
    this.display = true;
  }

  modif(penalite: IPenalite){
    this.penaliteisUpdate = true;
    this.penalite = penalite;
    this.displayPenalite = true;
  }

  showDialogToAddLiquidation(){
    this.display = true;
    this.liquidation = new Liquidation();
  }

  protected paginateLiquidations(data: ILiquidation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.liquidations = data;
  }


  getExerciceId(): number {
    if (this.exercice !== null) {
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  retirer(index) {
    this.liquidation.penalites.splice(index,1);
  }

  supprimerLiquidation(liquidation: ILiquidation) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (liquidation === null) {
          return;
        } else{
          liquidation.deleted = true;
          this.liquidationService.delete(liquidation.id).subscribe(
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

  protected subscribeToSaveResponseLiquidation(result: Observable<HttpResponse<ILiquidation>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }


  savePenalite() {
    this.penalite.contratId = this.contrat.id;
    this.penalite.liquidationId = this.liquidation.id;
    if (!this.liquidation.penalites) {
      this.liquidation.penalites = [];
    }
    if (this.penaliteisUpdate){
      this.penaliteisUpdate = false;
      this.liquidation.penalites.splice(this.index,1);
      this.liquidation.penalites.push(this.penalite);
    }
    else {
      this.liquidation.penalites.push(this.penalite);

    }
    this.displayPenalite = false;

  }

  save(){
    this.isSaving = true;
    this.liquidation.contratId = this.contrat.id;
    this.liquidation.avisdacId = this.contrat.avisDacId;
    this.liquidation.engagementId = this.engagement.id;
    this.liquidation.penaliteId = this.penalite.id;
    this.liquidation.wordFlow = WordFlow.CREATION_LIQUIDATION;
    // this.liquidation.contrat.ligneBudgetaireContrats = [];
    this.contrat.ligneBudgetaireContrats = [];
    if (this.liquidation.id !== undefined) {
      this.subscribeToSaveResponseLiquidation(this.liquidationService.update(this.liquidation));
      this.loadAll();
      this.loadLiquidationbyEngagement();
      this.display = false;
    } else {
      window.console.log(this.liquidation);
      this.subscribeToSaveResponseLiquidation(this.liquidationService.create(this.liquidation));
      this.loadAll();
      this.loadLiquidationbyEngagement();
      this.display = false;
    }

  }

  savePaiement(){
    this.isSaving = true;
    this.liquidation.wordFlow = WordFlow.LIQUIDER;
    this.liquidation.contrat.ligneBudgetaireContrats = [];
    this.liquidationService.update(this.liquidation).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<ILiquidation>) => {
        this.loadLiquidationbyEngagement();
        this.isPaiement = false;
        this.sucessMessage(true);
        window.console.log(res.body);
      }, () => {
        this.erroMessage(true);
      });
    this.isPaiement = false;
  }
  saveOrdonateur(){
    this.isSaving = true;
    this.liquidation.wordFlow = WordFlow.VISA_LIQ_ORDONNATEUR;
    this.liquidation.contrat.ligneBudgetaireContrats = [];
    this.liquidationService.update(this.liquidation).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<ILiquidation>) => {
        this.loadLiquidationbyEngagement();
        this.isOrdonateur = false;
        this.sucessMessage(true);
        window.console.log(res.body);
      }, () => {
        this.erroMessage(true);
      });
    this.isOrdonateur = false;
  }
  saveControl(){
    this.isSaving = true;
    this.liquidation.wordFlow = WordFlow.VISA_LIQ_CONTROLEUR;
    this.liquidation.contrat.ligneBudgetaireContrats = [];
    this.liquidationService.update(this.liquidation).pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<ILiquidation>) => {
        this.loadLiquidationbyEngagement();
        this.isControl = false;
        this.sucessMessage(true);
        window.console.log(res.body);
      }, () => {
        this.erroMessage(true);
      });
    this.isControl = false;
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.display = false;
  }

  onShowPaiement(){
    this.isPaiement = true;
    this.liquidation = new Liquidation();
    this.loadAll();
  }
  AnnullerPaiement(){
    this.isPaiement = false;
    this.liquidation = new Liquidation();
    this.loadAll();
  }

  AnnullerControl(){
    this.isControl = false;
    this.liquidation = new Liquidation();
  }


  onShowControl(){
    this.isControl = true;
    this.liquidation = new Liquidation();
    this.loadAll();
  }

  AnnullerOrdonateur(){
    this.isOrdonateur = false;
    this.liquidation = new Liquidation();
    this.loadAll();
  }
  onShowOrdonateur(){
    this.isOrdonateur = true;
    this.liquidation = new Liquidation();
    this.loadAll();
  }

  onLiquidationChange(id: any) {
    const object = this.liquidations.find(value => value.id === id);
    if (object) {
      this.liquidation = object;
    }
  }

  onFindLiquidation(liquidation: ILiquidation){
    if (liquidation!==null){
      this.liquidation = liquidation;
    }
  }

  onSendToControle(liquidation: ILiquidation) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de transmettre à l\'ordonnateur ?',
      accept: () => {
        liquidation.wordFlow = WordFlow.VISA_LIQ_CONTROLEUR;
        liquidation.contrat.ligneBudgetaireContrats = [];
        this.liquidationService.update(liquidation).pipe(takeUntil(this.destroy$))
          .subscribe((res: HttpResponse<ILiquidation>) => {
            this.loadLiquidationbyEngagement();
            this.sucessMessage(true);
            window.console.log(res.body);
          }, () => {
            this.erroMessage(true);
          });
      }
    });
  }

  onRowSelect() {
    this.loadLiquidationbyEngagement();
    this.besoinLigneBudgetaires.forEach(value => {
      if (value.id !== this.ligneSelect.id) {
        value.selected = false;
      }
    });
    this.ligneSelect.selected = true;
  }

  showMessage( cle: string,sever: string, sum: string, det: string) {
    this.messageService.add({
      key: cle,
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  ImprimerLiquidation(liquidation: ILiquidation) {
    this.reportService
      .ImprimerLiquidation(liquidation)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], {type: 'application/pdf'})), '_blank'));
    window.console.log("=======liquidation dambre========{}", liquidation);
  }

  sucessMessage(etat: boolean) {
    if (!etat) {
      this.showMessage('myKey', 'success', 'Enregistrement', 'Enregistrement effectué avec succès !');
    } else {
      this.showMessage('myKey', 'success', 'Mise à jour', 'Mise à jour effectuée avec succès !');
    }
    this.isPaiement = false;
    this.display = false;

  }

  erroMessage(etat: boolean) {
    if (!etat) {
      this.showMessage('myKey', 'error', 'Enregistrement', 'Echec de l\'enregistrement !');
    } else {
      this.showMessage('myKey', 'error', 'Mise à jour', 'Echec de la mise à jour !');
    }
  }

  protected onSaveError() {
    this.isSaving = false;
  }

}
