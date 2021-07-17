import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';
import { StatutExecutionService } from './statut-execution.service';
import { StatutExecutionComponent } from './statut-execution.component';
import { StatutExecutionDetailComponent } from './statut-execution-detail.component';
import { StatutExecutionUpdateComponent } from './statut-execution-update.component';
import { StatutExecutionDeletePopupComponent } from './statut-execution-delete-dialog.component';
import { IStatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';

@Injectable({ providedIn: 'root' })
export class StatutExecutionResolve implements Resolve<IStatutExecution> {
  constructor(private service: StatutExecutionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatutExecution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((statutExecution: HttpResponse<StatutExecution>) => statutExecution.body));
    }
    return of(new StatutExecution());
  }
}

export const statutExecutionRoute: Routes = [
  {
    path: '',
    component: StatutExecutionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionStatutExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatutExecutionDetailComponent,
    resolve: {
      statutExecution: StatutExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionStatutExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatutExecutionUpdateComponent,
    resolve: {
      statutExecution: StatutExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionStatutExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatutExecutionUpdateComponent,
    resolve: {
      statutExecution: StatutExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionStatutExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const statutExecutionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StatutExecutionDeletePopupComponent,
    resolve: {
      statutExecution: StatutExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionStatutExecution.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
