import {Component, OnInit, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core/auth/account.service';
import {Account} from 'app/core/user/account.model';
import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { Router} from '@angular/router';
import { IActivite} from 'app/shared/model/microserviceppm/activite.model';
import {ActiviteService} from 'app/entities/microserviceppm/activite/activite.service';
import {HttpResponse} from '@angular/common/http';
import {DashboardService} from 'app/entities/dashboard/dashboard.service';
import {ReportService} from 'app/entities/microservicedaccam/reports/reportService';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
  account: Account;
  authSubscription: Subscription;
  password: string;
  rememberMe: boolean;
  username: string;
  subscription: Subscription;
  passvisible = false;
  authenticationError: boolean;
  data: any;
  activites: IActivite[];
  accueil: any;
  type: string;
  display: boolean;


  constructor(
    private accountService: AccountService,
    // private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    protected activiteService: ActiviteService,
    protected exerciceBudgetService: ExerciceBudgetaireService,
    protected dashboardService: DashboardService,
    protected reportService: ReportService
  ) {}

  loadActivitesByCurentYear() {
     this.exerciceBudgetService.findCurrentExercice()
      .subscribe((exercice: HttpResponse<IExerciceBudgetaire>) => {
        this.activiteService.findAllByAnneeExercice(exercice.body.id)
          .subscribe((activites: HttpResponse<IActivite[]>) =>
          {
            this.activites = activites.body;
          });
      });
  }

  ngOnInit() {
   /* this.display = false;
    this.isChartLine = true;
    this.type = 'D';
    this.selectedActivite = new Activite(); */
   /* this.accountService.identity().subscribe((account: Account) => {
      this.account = account;

    });*/
   this.registerAuthenticationSuccess();
  }

  /* loadAccueiInfo() {
    this.dashboardService.getAccueilInfo().subscribe((res: HttpResponse<any>) => {
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
  }*/

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.identity().subscribe(account => {
        this.account = account;
      });
    });
  }

   ngAfterViewInit() {
    setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  /* onIncateurClick(element: string) {
    this.selectedActivite = new Activite();
    if (element === 'EX') {
      {
        this.activites = this.accueil.activitesExecute;
        this.type = element;

      }
    } else if (element === 'EC') {
      {
        this.activites = this.accueil.activitesEnCours;
        this.type = element;
      }
    } else if (element === 'EL') {
      {
        this.activites = this.accueil.activitesEnLitige;
        this.type = element;
      }
    } else if (element === 'ER') {
      {
        this.activites = this.accueil.activitesResilie;
        this.type = element;
      }
    } else {
      {
        this.activites = this.accueil.allActivites;
        this.type = element;
      }
    }
  }*/

  /* showDetailActivite(activite: IActivite) {
    if(this.display) {
      this.display = false;
    } else {
      if (activite) {
        this.selectedActivite = activite;
      }
      this.display = true;
    }
  }*/

  login() {
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .subscribe(
        () => {
          this.authenticationError = false;
          if (this.router.url.startsWith('/register') || this.router.url.startsWith('/activate') || this.router.url.startsWith('/reset')) {
            this.router.navigate(['/accueil']);
          } else {
            this.router.navigate(['/accueil']);
          }

          this.eventManager.broadcast({
            name: 'authenticationSuccess',
            content: 'Sending Authentication Success'
          });

          // previousState was set in the authExpiredInterceptor before being redirected to login modal.
          // since login is successful, go to stored previousState and clear previousState
          const redirect = this.stateStorageService.getUrl();
          if (redirect) {
           // window.console.log("==========>est connecté<=============");
            this.stateStorageService.storeUrl(null);
            this.router.navigate([redirect]);
          }

           if(this.isAuthenticated()) {
            this.accountService.identity().subscribe((account: Account) => {
              this.account = account;
              if (!account.passChange) {
                this.router.navigate(['/account/password']);
              } else {
                localStorage.setItem('Login',account.login);
               // location.reload();
              }
            });
          }
        },
        () => (this.authenticationError = true)
      );
  }

  /* changerGraphe(chartType: string) {
    switch (chartType) {
      case 'LINE':
        this.isChartLine = true;
        break;
      case 'BAR':
        this.isChartLine = false;
        break;
    }
  }*/

 /* onTabChange(event) {
    if(event.index === 1) {
      this.loadAccueiInfo();
    }
  }*/

  requestResetPassword() {
    this.router.navigate(['/account/reset', 'request']);
  }

  handleVisibility() {
    this.passvisible = !this.passvisible;
  }

  /* ngOnDestroy(): void {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }

  imprimeAllMarche() {
    this.reportService
      .imprimeAllMarche()
      .subscribe(response => window.open(URL.createObjectURL(new Blob([response], { type: 'application/pdf' })), '_blank'));
  } */

 /* ******************************************
 Requêtes d'affichage du Dashboard
 ********************************************/

}
