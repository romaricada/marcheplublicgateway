import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ILiquidation } from 'app/shared/model/microserviceexecution/liquidation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { OrdreCommandeService } from './ordre-commande.service';
import {takeUntil} from "rxjs/operators";
import {IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ILigneBudgetaire} from "app/shared/model/microserviceppm/ligne-budgetaire.model";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {LigneBudgetaireService} from "app/entities/microserviceppm/ligne-budgetaire/ligne-budgetaire.service";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {State} from "app/store/reducers";
import {IOrdreCommande, OrdreCommande} from "app/shared/model/microserviceexecution/ordre-commande.model";
import {IAvenant} from "app/shared/model/microserviceexecution/avenant.model";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'jhi-orde-commande',
  templateUrl: './ordre-commande.component.html'
})
export class OrdreCommandeComponent implements OnInit, OnDestroy {
  liquidations: ILiquidation[];
  contrats: IContrat[];
  contrat: IContrat;
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
  ordreDeCommande: IOrdreCommande;
  ordreDeCommandes: IOrdreCommande[];
  ordreDeCommandeSelected: IOrdreCommande[];
  avenant: IAvenant;
  display:boolean;
  displayDelete:boolean;
  isSaving:boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  ligneBudgetTaireList: Array<ILigneBudgetaire>;


  constructor(
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activiteService: ActiviteService,
    protected ordreCommandeService: OrdreCommandeService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected contratService: ContratService,
    protected ligneBudgetaireService: LigneBudgetaireService,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
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
    this.ordreCommandeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IOrdreCommande[]>) => this.paginateLiquidations(res.body, res.headers));
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
    this.ordreDeCommande = new OrdreCommande();
    this.ordreDeCommandes =[];
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
          this.findAllbyExerceId();
        }
      });


}

  showDialogToAddOrdreCommande(){
    this.ordreDeCommande = new OrdreCommande();
    this.display = true;
  }

  AnnullerOrdreCommande(){
    this.display = false;
  }

findAllbyExerceId(){
  this.contratService.findAllContratByExerceId(this.exercice.id).pipe(takeUntil(this.destroy$))
    .subscribe((res: HttpResponse<IContrat[]>) => {
      this.contrats = res.body;
    });
}

  actualisation() {
    this.activite = null;
    this.contrats = [];
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILiquidation) {
    return item.id;
  }

  supprimer(){
    this.displayDelete = true;
  }

  annulerDelete(){
    this.displayDelete =false;
  }

  deleteAll() {
    this.ordreCommandeService.deleteAll(this.ordreDeCommandeSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('myKey', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('myKey', 'error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
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

  protected paginateLiquidations(data: IOrdreCommande[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.ordreDeCommandes = data;
  }

  loadExercicice() {
    this.activiteService.findAllByAnneeExercice(this.getExerciceId())
      .subscribe((res: HttpResponse<IActivite[]>) => {
        if (res.body.length > 0) {
          res.body.forEach(value => {
            value.nomActivite = value.codeLignePlan + ' ' + value.naturePrestationLibelle;
          });
          this.activites = res.body;
        }
        this.ligneBudgetaireService.findAllByExercice(this.getExerciceId())
          .pipe(takeUntil(this.destroy$)).subscribe((ligne: HttpResponse<ILigneBudgetaire[]>) => {
          if (ligne) {
            this.ligneBudgetTaireList = ligne.body;
          }
        });
      });
  }

  loadOrdreDeCommande(){
    this.ordreCommandeService.findAllbyContrat(this.contrat.id).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<IOrdreCommande[]>) => {
      this.ordreDeCommandes = res.body;
    });
  }

  getExerciceId(): number {
    if (this.exercice !== null) {
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  add(ordreCommande: IOrdreCommande){
    ordreCommande === null ? (this.ordreDeCommande = new OrdreCommande()) : (this.ordreDeCommande = ordreCommande);
    this.display = true;
  }

  save(){
    this.ordreDeCommande.contrat= this.contrat;
    this.ordreDeCommande.avenant = this.avenant;
    this.ordreDeCommande.contratId = this.contrat.id;

    if (this.ordreDeCommande.id !== undefined) {
      this.subscribeToSaveResponse(this.ordreCommandeService.update(this.ordreDeCommande));
      this.loadAll();
      this.display = false;
    } else {
      this.subscribeToSaveResponse(this.ordreCommandeService.create(this.ordreDeCommande));
      this.loadAll();
      this.display = false;
    }
    this.contrat = null;
    this.loadAll();
    this.loadOrdreDeCommande();

  }

  deleteElement(ordreDeCommande: IOrdreCommande) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (ordreDeCommande === null) {
          return;
        } else{
          ordreDeCommande.deleted = true;
          this.ordreCommandeService.delete(ordreDeCommande.id).subscribe(
            () => {
              this.loadAll();
              this.loadOrdreDeCommande();
              this.contrat = null;
              this.showMessage('myKey1', 'success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('myKey1', 'error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrdreCommande>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.isSaving = false;

  }

  showMessage( cle: string,sever: string, sum: string, det: string) {
    this.messageService.add({
      key: cle,
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  protected onSaveError() {
    this.isSaving = false;
  }

}
