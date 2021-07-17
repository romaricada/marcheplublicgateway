import {Component, OnInit} from '@angular/core';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Activite, IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ExerciceBudgetaire, IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {IPPM, PPM} from 'app/shared/model/microserviceppm/ppm.model';
import {PPMService} from 'app/entities/microserviceppm/ppm/ppm.service';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {HttpResponse} from '@angular/common/http';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {IPpmActivite, PpmActivite} from 'app/shared/model/microserviceppm/ppm-activite.model';
import {AlertService} from 'app/entities/microserviceppm/alert/alert.service';
import {AccountService} from 'app/core/auth/account.service';
import {IUserNotification} from 'app/shared/model/microserviceppm/user-notification.model';
import {IEtapeActivitePpm} from 'app/shared/model/microserviceppm/etape-activite-ppm.model';

@Component({
  selector: 'jhi-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

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
  // etapeActivitePPMs: IEtapeActivitePpm[];
  activites: IActivite[];
  activite: IActivite;
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  ppms: IPPM[];
  ppm: IPPM;
  ppmActivites: IPpmActivite[];
  ppmActivite: IPpmActivite;
  statut = '';
  account: Account;
  userNotifications: IUserNotification[];

  constructor(

    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected activiteService: ActiviteService,
    protected ppmService: PPMService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
    protected alerteService: AlertService,
    protected accountService: AccountService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  init() {
    this.userNotifications = [];
    this.activite = new Activite();
    this.activites = [];
    this.exercices = [];
    this.exercice = new ExerciceBudgetaire();
    this.ppms = [];
    this.ppm = new PPM();
    this.ppmActivites = [];
    this.ppmActivite = new PpmActivite();
  }

  ngOnInit() {
    this.init();
    this.loadEsercice();

    this.activatedRoute.params.subscribe(params => {
      this.statut = params['id'];
      window.console.log('-------------------------->   ');
      window.console.log(params);
    });

    this.accountService.identity().subscribe((account: Account) => {
      this.account = account;

      window.console.log(this.account);

    });

  }

  loadEsercice(): void {
    this.exerciceBudgetaireService.findCurrentExercice().subscribe(
      (res: HttpResponse<IExerciceBudgetaire>) => {
        this.exercice  = res.body;
        this.loadPPM();
      },
    );
  }

  loadPPM(): void {
    if (this.exercice !== null) {
      this.ppmService.findPpmByExercice(this.exercice.id).subscribe(
        (res: HttpResponse<IPPM>) => {
          this.ppm = res.body;
          this.loadActiviteByPPM();
        },
      );
    }
  }
  loadActiviteByPPM(): void {
    this.activiteService.findAllActiviteByPPM(isNaN(this.ppm.id) ? 0 : this.ppm.id).subscribe(
      (res: HttpResponse<IPpmActivite[]>) => {
        this.ppmActivites = res.body;
      },
    );

    this.alerteService.getEtapesNotVisited(this.account).subscribe(
      (res: HttpResponse<IUserNotification[]>) => {
        this.userNotifications = res.body;
      }
    );
  }

  viewActivite(etapeActivitePPm: IEtapeActivitePpm): void {
    window.console.log(etapeActivitePPm);
  }

  /* ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  } */

}
