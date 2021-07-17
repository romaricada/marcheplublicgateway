import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Decision } from 'app/shared/model/microservicedaccam/decision.model';
import { DecisionService } from './decision.service';
import { DecisionComponent } from './decision.component';
import { DecisionDetailComponent } from './decision-detail.component';
import { DecisionUpdateComponent } from './decision-update.component';
import { DecisionDeletePopupComponent } from './decision-delete-dialog.component';
import { IDecision } from 'app/shared/model/microservicedaccam/decision.model';

@Injectable({ providedIn: 'root' })
export class DecisionResolve implements Resolve<IDecision> {
  constructor(private service: DecisionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDecision> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((decision: HttpResponse<Decision>) => decision.body));
    }
    return of(new Decision());
  }
}

export const decisionRoute: Routes = [
  {
    path: '',
    component: DecisionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDecision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DecisionDetailComponent,
    resolve: {
      decision: DecisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDecision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DecisionUpdateComponent,
    resolve: {
      decision: DecisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDecision.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DecisionUpdateComponent,
    resolve: {
      decision: DecisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDecision.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const decisionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DecisionDeletePopupComponent,
    resolve: {
      decision: DecisionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDecision.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
