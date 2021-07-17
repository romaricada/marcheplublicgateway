import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {Activite, IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {ReportANouveauService} from 'app/entities/microserviceppm/report-a-nouveau/report-a-nouveau.service';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {IPpmActivite, PpmActivite} from 'app/shared/model/microserviceppm/ppm-activite.model';
import {ConfirmationService, MessageService} from 'primeng/api';
import {IEngagement} from 'app/shared/model/microserviceexecution/engagement.model';
import {EngagementService} from 'app/entities/microserviceexecution/engagement/engagement.service';
import {PpmActiviteService} from "app/entities/microserviceppm/ppm-activite/ppm-activite.service";
import {select, Store} from '@ngrx/store';
import {State} from "app/store/reducers";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'jhi-ppm',
  templateUrl: './report-a-nouveau.component.html'
})
export class ReportANouveauComponent implements OnInit, OnDestroy {
  activites: IActivite[];
  activite: IActivite;
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  engagement: IEngagement;
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
  displayAdd: Boolean;
  display: Boolean;
  reportLigne = false;
  isSaving: Boolean;
  report = true;
  ppmActivite: IPpmActivite;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(
    protected activiteService: ActiviteService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected reportANouveauService: ReportANouveauService,
    protected parseLinks: JhiParseLinks,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected ppmActiviteService: PpmActiviteService,
    protected engagementService: EngagementService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
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
    this.activiteService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IActivite[]>) => this.paginateActivites(res.body, res.headers));
  }

  loadAllReportExercice(isReport) {
    if (this.exercice !== null) {
      this.activites = [];
      this.activiteService
        .findAllActiviteByAnneeAndExercice(this.exercice.id, isReport)
        .subscribe((res: HttpResponse<IActivite[]>) => {
          this.activites = res.body;
          window.console.log("====act====");
          window.console.log(this.activites);
          window.console.log("====act====");
        });
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/activite'], {
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
      '/activite',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.ppmActivite = new PpmActivite();
    this.activite = new Activite();
    this.exerciceBudgetaireService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
      this.exercices = res.body;
    });
    this.registerChangeInActivites();
    this.selectExerciceCourant();
    this.loadAllReportExercice(true);
    this.loadAllReportExercice(false);
  }
  selectExerciceCourant(){
    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.activiteService
            .findAllActiviteByAnneeAndExercice(this.exercice.id, false)
            .subscribe((res: HttpResponse<IActivite[]>) => {
              this.activites = res.body;
            });
        }
      });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IActivite) {
    return item.id;
  }

  registerChangeInActivites() {
    this.eventSubscriber = this.eventManager.subscribe('activiteListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateActivites(data: IActivite[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.activites = data;
  }

  ajouterUnOuPlusieurReport(activite: IActivite) {
    this.ppmActivite.activiteId = activite.id;
    this.engagementService.montantAReporter(activite.id).subscribe((res: HttpResponse<number>) => {
      this.ppmActivite.montantDepenseEngageNonLiquide = this.ppmActivite.creditDisponible;
    });
    this.loadAllReportExercice(false);
    this.isSaving = true;
    this.displayAdd = true;
  }

  annuler() {
    this.activite = new Activite();
    this.displayAdd = false;
  }

  saveReport(ppmActivite: PpmActivite) {
    this.isSaving = true;
    this.engagementService.montantAReporter(ppmActivite.activiteId).subscribe((res: HttpResponse<number>) => {
      this.ppmActivite.montantDepenseEngageNonLiquide = res.body;
    });
      this.ppmActivite.exerciceId = this.exercice.id;
      this.reportANouveauService.saveReport(ppmActivite).subscribe(
        () => {
          this.displayAdd = false;
          this.showMessage('myKey', 'success', 'ENREGISTREMENT', 'Activitée reporté avec succès!');
          this.loadAllReportExercice(false);
        },
        () => this.onSaveError()
      );

      this.ppmActivite.creditDisponible = null;
      this.displayAdd = false;
  }

  deleteReport(ppmActivite: IPpmActivite) {
    ppmActivite.activiteId = this.activite.id;
    window.console.log("=======debut=======");
    window.console.log(this.ppmActivite);
    window.console.log("=======fin=========");
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir retirer le sous ppm du report ?',
      accept: () => {
          ppmActivite.deleted = true;
          this.reportANouveauService.deleteReporter(ppmActivite).subscribe((res: HttpResponse<any>) => {
              this.loadAllReportExercice(true);
              window.console.log(res.body);
              this.showMessage('myKey', 'success', 'RETRAIT', 'retrait effectuée avec succès !');
            })
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

  getExerciceId(): number {
    if (this.exercice !== null) {
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

  onSaveError() {
    this.isSaving = false;
    this.showMessage('myKey', 'error', 'ENREGISTREMENT', 'Echec de l\'enregistrement !');
  }

  tabViewChange(event) {
    if (event.index === 0) {
      this.loadAllReportExercice(false);
    } else if (event.index === 1) {
      this.loadAllReportExercice(true);
    }
    window.console.log(event);
  }
}
