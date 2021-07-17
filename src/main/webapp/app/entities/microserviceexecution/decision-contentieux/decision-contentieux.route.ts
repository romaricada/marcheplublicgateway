import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';
import { DecisionContentieuxService } from './decision-contentieux.service';
import { DecisionContentieuxComponent } from './decision-contentieux.component';
import { DecisionContentieuxDetailComponent } from './decision-contentieux-detail.component';
import { DecisionContentieuxUpdateComponent } from './decision-contentieux-update.component';
import { DecisionContentieuxDeletePopupComponent } from './decision-contentieux-delete-dialog.component';
import { IDecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';

@Injectable({ providedIn: 'root' })
export class DecisionContentieuxResolve implements Resolve<IDecisionContentieux> {
  constructor(private service: DecisionContentieuxService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDecisionContentieux> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((decisionContentieux: HttpResponse<DecisionContentieux>) => decisionContentieux.body));
    }
    return of(new DecisionContentieux());
  }
}

export const decisionContentieuxRoute: Routes = [
  {
    path: '',
    component: DecisionContentieuxComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionDecisionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DecisionContentieuxDetailComponent,
    resolve: {
      decisionContentieux: DecisionContentieuxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionDecisionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DecisionContentieuxUpdateComponent,
    resolve: {
      decisionContentieux: DecisionContentieuxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionDecisionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DecisionContentieuxUpdateComponent,
    resolve: {
      decisionContentieux: DecisionContentieuxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionDecisionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const decisionContentieuxPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DecisionContentieuxDeletePopupComponent,
    resolve: {
      decisionContentieux: DecisionContentieuxResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionDecisionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
