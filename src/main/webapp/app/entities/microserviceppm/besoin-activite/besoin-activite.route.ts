import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {BesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {BesoinActiviteService} from 'app/entities/microserviceppm/besoin-activite/besoin-activite.service';
import {BesoinActiviteComponent} from 'app/entities/microserviceppm/besoin-activite/besoin-activite.component';

@Injectable({providedIn: 'root'})
export class BesoinActiviteResolve implements Resolve<IBesoinLigneBudgetaire> {
  constructor(private service: BesoinActiviteService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBesoinLigneBudgetaire> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((besoinLigneBudgetaire: HttpResponse<BesoinLigneBudgetaire>) => besoinLigneBudgetaire.body));
    }
    return of(new BesoinLigneBudgetaire());
  }
}

export const besoinActiviteRoute: Routes = [
  {
    path: '',
    component: BesoinActiviteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Besoin-activite'
    },
    canActivate: [UserRouteAccessService]
  },
];

