import {Component, OnInit} from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import { IDeliberation} from 'app/shared/model/microservicedaccam/deliberation.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {Activite, IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {LotService} from 'app/entities/microservicedaccam/lot/lot.service';
import {Fichier, IFichier} from 'app/entities/file-manager/file-menager.model';
import {ReportService} from 'app/entities/microservicedaccam/reports/reportService';
import {DashboardService} from 'app/entities/dashboard/dashboard.service';
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {AvisDac, IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {State} from "app/store/reducers";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";


@Component({
  selector: 'jhi-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['etat.component.scss']
})
export class EtatComponent implements OnInit {
  candidatLots: ICandidatLot[];
  activites: IActivite[];
  activite: IActivite;
  avisDac: IAvisDac;
  exercice: IExerciceBudgetaire;
  exercices: IExerciceBudgetaire[];
  candidatLot: ICandidatLot;
  deliberation: IDeliberation;
  lots: ILot[];
  lot: ILot;
  error: any;
  success: any;
  dateDp: any;
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
  displayDelete: Boolean;
  isSaving: Boolean;
  navigation = false;
  index: number;
  fichiers: FileList;
  files: IFichier[];
  file: Fichier;
  isLoading: boolean;
  selectedActivite: IActivite;
  accueil: any;
  type: string;
  data: any;
  data1: any;
  avisDacs: IAvisDac[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedAvisdac: IAvisDac;





  constructor(
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected activiteService: ActiviteService,
    protected lotService: LotService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected reportService: ReportService,
    protected dashboardService: DashboardService,
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



  ngOnInit() {
    this.selectedActivite = new Activite();
    this.isLoading = true;
    // this.loadAccueiInfo();
    this.activites  = [];
    this.avisDacs  = [];
   // this.exercice = new ExerciceBudgetaire();
    this.accueil = {};
    this.accueil.avisDacEnCours = [];
    this.selectedAvisdac = new AvisDac();


    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();
        }
      });
  }

  actualisation() {
    this.avisDacs = [];
  }



  getExerciceId(): number {
    if (this.exercice !== null) {
      window.console.log("========================={}", this.exercice.id);
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  getActiviteId(): number {
    if (this.activite !== null) {
      return this.activite.id;
    } else {
      return 0;
    }
  }


  loadAccueiInfo() {
    this.dashboardService.getAccueilInfo(this.exercice.id).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.accueil = res.body;
      window.console.log("==================this.accueil================{}", this.accueil);
      // this.activites = this.accueil.allActivites;

      this.data1 = {
        labels: this.accueil.labels,
        datasets: [
          {
            data: this.accueil.data,
            backgroundColor: this.accueil.colors,
            hoverBackgroundColor: this.accueil.colors
          }]
      };

      this.data = {
        labels: this.accueil.labels,
        datasets: [
          {
            label: 'Etat',
            backgroundColor: this.accueil.colors,
            borderColor: '#1E88E5',
            data: this.accueil.data
          }
        ]
      };
    });
  }

  imprimeAllMarche() {
    this.reportService
      .imprimeAllMarche(this.exercice.id)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeFinishedMarches() {
    this.reportService
      .imprimeFinishedMarches(this.exercice.id)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }



  imprimeMarchesEnCours() {
    this.reportService
      .imprimeMarchesEnCours(this.exercice.id)
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeMarchesAyantLitige() {
      this.reportService
        .imprimeMarchesAyantLitige(this.exercice.id)
        .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeMarchesAyantContratResilie() {
      this.reportService
        .imprimeMarchesAyantContratResilie(this.exercice.id)
        .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }



  onIncateurClick(event) {
    this.selectedAvisdac = new AvisDac();
    if (event.index === 2) {
      {
        this.loadAccueiInfo();
        this.avisDacs = this.accueil.avisDacExecute;

      }
    } else if (event.index === 1) {
      {
        this.loadAccueiInfo();
        this.avisDacs = this.accueil.avisDacEnCours;

      }
    } else if (event.index === 3) {
      {
        this.loadAccueiInfo();
        this.avisDacs = this.accueil.avisDacEnLitige;

      }
    } else if (event.index === 4) {
      {
        this.loadAccueiInfo();
        this.avisDacs = this.accueil.avisDacResilie;

      }
    } else if (event.index === 0) {
      {
        this.loadAccueiInfo();
        this.avisDacs = this.accueil.allAvisDac;
      }
    }
  }

}
