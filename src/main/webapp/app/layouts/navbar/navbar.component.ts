import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JhiEventManager, JhiLanguageService} from 'ng-jhipster';
import {SessionStorageService} from 'ngx-webstorage';

import {VERSION} from 'app/app.constants';
import {JhiLanguageHelper} from 'app/core/language/language.helper';
import {AccountService} from 'app/core/auth/account.service';
import {LoginService} from 'app/core/login/login.service';
import {ProfileService} from 'app/layouts/profiles/profile.service';
import {NabBarService} from 'app/layouts/navbar/navbar.service';
import {HttpResponse} from '@angular/common/http';
import {interval, Subject, Subscription} from 'rxjs';
import {IEtapeActivitePpm} from "app/shared/model/microserviceppm/etape-activite-ppm.model";
import {Account} from 'app/core/user/account.model';
import {select, Store} from '@ngrx/store';
import {State} from 'app/store/reducers';
import {fetchExerciceCourant, setExerciceCourant} from 'app/store/action';
import {selectetExerciceCourant} from 'app/store/selector';
import {takeUntil} from 'rxjs/operators';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    authSubscription: Subscription;
    swaggerEnabled: boolean;
    version: string;
    account: Account;
    myLogin: String;
    statusTask: number[] = [];
    total = 0;
    id: number[] = [1, 2, 3];
    etapeActivitePPMs: IEtapeActivitePpm[] = [];
    exercice: IExerciceBudgetaire;
    newExercice: IExerciceBudgetaire;
    exercices: IExerciceBudgetaire[];
    destroy$: Subject<boolean> = new Subject<boolean>();
    display: boolean;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private accountService: AccountService,
        private nabBarService: NabBarService,
        private profileService: ProfileService,
        private eventManager: JhiEventManager,
        private router: Router,
        private store: Store<State>,
        private exerciceBudgetaireService: ExerciceBudgetaireService
    ) {
        this.version = VERSION ? (VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION) : '';
        this.isNavbarCollapsed = true;
        /* if(localStorage.getItem('Login')) {
          this.myLogin = localStorage.getItem('Login');
        }*/
    }

    ngOnInit() {
        this.newExercice = null;
        this.store.dispatch(fetchExerciceCourant());
        this.store.pipe(select(selectetExerciceCourant)).pipe(takeUntil(this.destroy$))
            .subscribe(exercice => {
                if (exercice) {
                    this.exercice = {...exercice};
                }
            });
        this.exerciceBudgetaireService.query().pipe(takeUntil(this.destroy$))
            .subscribe(res => {
                this.exercices = res.body;
            });
        this.authSubscription = this.eventManager.subscribe('authenticationSuccess', () => {
            this.accountService.identity().subscribe(account => {
                this.account = account;
                this.myLogin = account.login;
            });
        });

        if (this.isAuthenticated()) {
            this.languages = this.languageHelper.getAll();

            this.profileService.getProfileInfo().subscribe(profileInfo => {
                this.inProduction = profileInfo.inProduction;
                this.swaggerEnabled = profileInfo.swaggerEnabled;
            });

            this.accountService.identity().subscribe((account) => {
                this.account = account;
                this.myLogin = account.login;
                //  window.console.log(this.account);
            });

            this.load();
            this.loadEtapesNotVisited();

            interval(1000 * 3600 * 12).subscribe(
                () => {
                    this.load();
                    this.loadEtapesNotVisited();
                }
            );
        }

        // this.tables[0] = this.tables[0].concat("hujjnnjn");
        // this.tables[1] = ["yegfyfg1", "dbfgfh1"];

        // window.console.log(this.tables);
        // this.load().setTimeout(this.load(), 5000);

    }


    loadEtapesNotVisited(): void {
        /* this.alerteService.getEtapesNotVisited().subscribe(
          (res: HttpResponse<IEtapeActivitePpm[]>) => {
            this.etapeActivitePPMs = res.body;
          }
        ); */

        this.nabBarService.getCurentUser(this.account).subscribe(
            (res: HttpResponse<IEtapeActivitePpm[]>) => {
                this.etapeActivitePPMs = res.body;
                // window.console.log(res.body);
            },
        );
    }

    load() {
        this.nabBarService.getCurentTaskCount().subscribe(
            (res: HttpResponse<number[]>) => {
                this.statusTask = res.body;
                this.total = 0;
                this.statusTask.forEach(s => {
                    this.total += s;
                })
                // this.total = this.statusTask.c)
            }
        );
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        // this.getUserName();
        return this.accountService.isAuthenticated();
    }

    login() {
        // this.modalRef = this.loginModalService.open();
        this.router.navigate(['']);
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    onChangeExerciceClick() {
        this.display = true
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    annuler() {
        this.display = false;
    }

    changeExercice() {
        this.store.dispatch(setExerciceCourant(this.newExercice));
        this.exercice = this.newExercice;
        this.newExercice = null;
        this.display = false;
    }
}
