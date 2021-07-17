import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError} from '@angular/router';

import {JhiLanguageHelper} from 'app/core/language/language.helper';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {Subject} from 'rxjs';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html'
})
export class JhiMainComponent implements OnInit, OnDestroy {
    exercice: IExerciceBudgetaire;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private jhiLanguageHelper: JhiLanguageHelper,
                private router: Router) {
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'marchepublicgatewayApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
