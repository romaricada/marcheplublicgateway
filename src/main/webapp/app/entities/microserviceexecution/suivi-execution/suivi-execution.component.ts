import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {IContrat} from "app/shared/model/microserviceexecution/contrat.model";
import {ContratService} from "app/entities/microserviceexecution/contrat/contrat.service";
import {ITypeAvenant, TypeAvenant} from "app/shared/model/microserviceexecution/type-avenant.model";
import {Activite, IActivite} from "app/shared/model/microserviceppm/activite.model";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {Crieteria, ITache, Tache} from "app/shared/model/microservicedaccam/tache.model";
import {ITacheEtape, TacheEtape} from "app/shared/model/microservicedaccam/tache-etape.model";
import {IMembreCommission, MembreCommission} from "app/shared/model/microservicedaccam/membre-commission.model";
import {IMembre, Membre} from "app/shared/model/microservicedaccam/membre.model";
import {ExerciceBudgetaireService} from "app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service";
import {IEtapeActivitePpm} from "app/shared/model/microserviceppm/etape-activite-ppm.model";
import {ILot} from "app/shared/model/microservicedaccam/lot.model";
import {LotService} from "app/entities/microservicedaccam/lot/lot.service";
import {ITacheWorkflow} from "app/shared/model/microservicedaccam/tache-workflow.model";
import {IWorkflow} from "app/shared/model/microservicedaccam/workflow.model";
import {TacheService} from "app/entities/microservicedaccam/tache/tache.service";
import {TacheEtapeService} from "app/entities/microservicedaccam/tache-etape/tache-etape.service";
import {Etat} from "app/shared/model/enumerations/etat";

@Component({
  selector: 'jhi-suivi-execution',
  templateUrl: './suivi-execution.component.html'
})
export class SuiviExecutionComponent implements OnInit, OnDestroy {

  displayDelete: boolean;
  isSaving: boolean;
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  ajout = false;
  typeAvenant: ITypeAvenant;
  contrats: IContrat[];
  contrat: IContrat;
  predicate: any;
  display: Boolean;
  previousPage: any;
  displaych: boolean;
  activites: IActivite[];
  activite: IActivite;
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  taches: ITache[];
  tache: ITache;

  tacheTMP: ITache[];
  toSaisi: boolean;
  tacheEtape: ITacheEtape;
  refToRemove: ITacheEtape[] = [];
  lots: ILot[];
  lot: ILot;
  tacheworkflow: ITacheWorkflow;
  tacheworkflows: ITacheWorkflow[];
  etape: boolean;

  workflow: IWorkflow;
  workflows: IWorkflow[];


  etapeActivitePpms: IEtapeActivitePpm[] = [];


  membreCommissions: IMembreCommission[] = [];
  newMembreCommission: IMembreCommission;


  membres: IMembre[] = [];

  reverse: any;

  constructor(
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected contratService: ContratService,
    protected activiteService: ActiviteService,
    protected exerciceService: ExerciceBudgetaireService,
    protected lotService: LotService,
    protected tacheService: TacheService,
    protected etapeTacheService: TacheEtapeService,
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


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/avenant'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
  }

  supprimer() {
    this.displayDelete = true;
  }

  ajouter(): void {
    if (!this.ajout) {
      this.typeAvenant = new TypeAvenant();
      this.ajout = true;
    }
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/avenant',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
  }

  ngOnInit() {
    this.tache = new Tache();
    this.loadExercice();
    this.exercices = [];
    this.tacheTMP = [];
    this.toSaisi = false;
    this.tacheEtape = new TacheEtape();
    this.newMembreCommission = new MembreCommission();
    this.newMembreCommission.membre = new Membre();
    this.etape = false;
    this.activite = new Activite();

  }

  loadTaskByCriteria(id: number, eta: string, crieteria: Crieteria) {
    this.tacheService.finAllByCriteria(id, eta, crieteria).subscribe((res: HttpResponse<ITache[]>) => {
      this.taches = res.body;
      this.tacheTMP = res.body;
    });
  }

  getTacheId(): number {
    if (this.tache !== null) {
      return this.tache.id;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    // this.eventManager.destroy(this.eventSubscriber);
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadExercice() {
    this.exerciceService.findAllWithoutPage()
      .subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
        this.exercices = res.body;
      })
  }

  getExerciceId(): number {
    if (this.exercice !== null) {
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  filterTache() {
    if(this.lot!==null) {
      this.loadTaskByActiviteOrLot(this.getLotId(), Crieteria.byLot);
    } else {
      this.loadTaskByActiviteOrLot(this.getActiviteId(), Crieteria.byAvisDac);
    }

  }

  activiteChange() {
    this.lotService.findLotByAvisDac(this.getActiviteId()).subscribe((res: HttpResponse<ILot[]>) => {
      this.lots = res.body;
    });
    this.loadTaskByActiviteOrLot(this.getActiviteId(), Crieteria.byAvisDac);
  }

  getActiviteId(): number {
    if (this.activite.id !== undefined) {
      return this.activite.id;
    } else {
      return 0;
    }
  }

  loadTaskByActiviteOrLot(id: number, typeFilter: Crieteria) {
    this.loadTaskByCriteria(id, 'ALL', typeFilter);
  }


  getLotId(): number {
    if (this.lot !== null) {
      return this.lot.id;
    } else {
      return 0;
    }
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

  onTacheChange() {
    if(this.tache) {
      this.etapeTacheService.findTacheEtapeByTache(this.tache.id)
        .subscribe((res: HttpResponse<ITacheEtape[]>) => (this.taches = res.body));
    }
  }


  tabViewChange(event) {
    this.taches = this.tacheTMP;
    if (event.index === 1) {
      this.taches = this.tacheTMP.filter(value => value.etat === Etat.INITIAL);
    } else if (event.index === 2) {
      this.taches = this.tacheTMP.filter(value => value.etat === Etat.ENCOURS);
    } else if (event.index === 3) {
      this.taches = this.tacheTMP.filter(value => value.etat === Etat.TERMINE);
    } else if (event.index === 4) {
      this.taches = this.tacheTMP;
    }
    window.console.log(event);
  }

}
