import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Account} from "app/core/user/account.model";
import {Subject, Subscription} from "rxjs";
import {AccountService} from "app/core/auth/account.service";
import {ActiviteService} from "app/entities/microserviceppm/activite/activite.service";
import {DashboardService} from "app/entities/dashboard/dashboard.service";
import {HttpResponse} from "@angular/common/http";
import {JhiEventManager} from "ng-jhipster";
import {AvisDac, IAvisDac} from "app/shared/model/microservicedaccam/avis-dac.model";
import {select, Store} from "@ngrx/store";
import {selectetExerciceCourant} from "app/store/selector";
import {takeUntil} from "rxjs/operators";
import {IExerciceBudgetaire} from "app/shared/model/microserviceppm/exercice-budgetaire.model";
import {State} from "app/store/reducers";

@Component({
  selector: 'jhi-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['home.scss']
})

export class AccueilComponent implements OnInit, AfterViewInit {

  account: Account;
  password: string;
  rememberMe: boolean;
  username: string;
  subscription: Subscription;
  data: any;
  data1: any;
  avisDacs: IAvisDac[];
  selectedAvisdac: IAvisDac;
  isChartLine: boolean;
  accueil: any;
  type: string;
  display: boolean;
  authSubscription: Subscription;
  exercice: IExerciceBudgetaire;
  destroy$: Subject<boolean> = new Subject<boolean>();



  constructor(
    private accountService: AccountService,
    protected activiteService: ActiviteService,
    protected dashboardService: DashboardService,
    private eventManager: JhiEventManager,
    protected store: Store<State>

) {
  }

  ngOnInit(): void {
    this.accueil = {};
    this.accueil.avisDacEnCours = [];
    this.display = false;
    this.isChartLine = true;
    // this.accueil = {};
    this.type = 'D';
    this.selectedAvisdac = new AvisDac();
    this.accountService.identity().subscribe(account => {
      this.account = account;
      localStorage.setItem('Login',account.login);
     // this.loadAccueiInfo();
    });

    this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
      .subscribe(exercice => {
        if (exercice) {
          this.exercice = exercice;
          this.actualisation();
        }
      });
    this.registerAuthenticationSuccess();
  }

  actualisation() {
    this.avisDacs = [];
  }

  ngAfterViewInit(): void {
   // location.reload();
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

  loadAccueiInfo() {
    this.dashboardService.getAccueilInfo(this.getExerciceId()).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      this.accueil = res.body;

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

  getExerciceId(): number {
    if (this.exercice !== null && this.exercice !== undefined) {
      window.console.log("========================={}", this.exercice.id);
      return this.exercice.id;
    } else {
      return 0;
    }
  }

  onIncateurClick(element: string) {
    this.selectedAvisdac = new AvisDac();
    if (element === 'EX') {
      {
        this.avisDacs = this.accueil.avisDacExecute;
        this.type = element;
        window.console.log("==============this.accueil.avisDacExecute============");
        window.console.log(this.accueil.avisDacExecute);
        window.console.log("==========================");
      }
    } else if (element === 'EC') {
      {
        this.avisDacs = this.accueil.avisDacEnCours;
        this.type = element;
        window.console.log("==============this.accueil.avisDacEnCours============");
        window.console.log(this.accueil.avisDacEnCours);
        window.console.log("==========================");
      }
    } else if (element === 'EL') {
      {
        this.avisDacs = this.accueil.avisDacEnLitige;
        this.type = element;
        window.console.log("==============this.accueil.avisDacEnLitige============");
        window.console.log(this.accueil.avisDacEnLitige);
        window.console.log("==========================");

      }
    } else if (element === 'ER') {
      {
        this.avisDacs = this.accueil.avisDacResilie;
        this.type = element;
        window.console.log("==============this.accueil.avisDacResilie============");
        window.console.log(this.accueil.avisDacResilie);
        window.console.log("==========================");
      }
    } else {
      {
        this.avisDacs = this.accueil.allAvisDac;
        this.type = element;
        window.console.log("==============this.accueil.allAvisDac============");
        window.console.log(this.accueil.allAvisDac);
        window.console.log("==========================");
      }
    }
  }

  showDetailActivite(avisDac: IAvisDac) {
    if(this.display) {
      this.display = false;
    } else {
      if (avisDac) {
        this.selectedAvisdac = avisDac;
      }
      this.display = true;
    }
  }

  changerGraphe(chartType: string) {
    switch (chartType) {
      case 'LINE':
        this.isChartLine = true;
        break;
      case 'BAR':
        this.isChartLine = false;
        break;
    }
  }

  onTabChange(event) {
    if(event.index === 1) {
      this.loadAccueiInfo();
    }
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  /* imprimeAllMarche() {
    this.reportService
      .imprimeAllMarche()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeFinishedMarches() {
    this.reportService
      .imprimeFinishedMarches()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeMarchesEnCours() {
    this.reportService
      .imprimeMarchesEnCours()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeMarchesAyantLitige() {
    this.reportService
      .imprimeMarchesAyantLitige()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  }

  imprimeMarchesAyantContratResilie() {
    this.reportService
      .imprimeMarchesAyantContratResilie()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  } */

}
