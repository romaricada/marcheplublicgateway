import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';
import { EtapeExecutionService } from './etape-execution.service';
import { EtapeExecutionComponent } from './etape-execution.component';
import { EtapeExecutionDetailComponent } from './etape-execution-detail.component';
import { EtapeExecutionUpdateComponent } from './etape-execution-update.component';
import { EtapeExecutionDeletePopupComponent } from './etape-execution-delete-dialog.component';
import { IEtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';

@Injectable({ providedIn: 'root' })
export class EtapeExecutionResolve implements Resolve<IEtapeExecution> {
  constructor(private service: EtapeExecutionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtapeExecution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((etapeExecution: HttpResponse<EtapeExecution>) => etapeExecution.body));
    }
    return of(new EtapeExecution());
  }
}

export const etapeExecutionRoute: Routes = [
  {
    path: '',
    component: EtapeExecutionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionEtapeExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EtapeExecutionDetailComponent,
    resolve: {
      etapeExecution: EtapeExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionEtapeExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EtapeExecutionUpdateComponent,
    resolve: {
      etapeExecution: EtapeExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionEtapeExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EtapeExecutionUpdateComponent,
    resolve: {
      etapeExecution: EtapeExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionEtapeExecution.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const etapeExecutionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EtapeExecutionDeletePopupComponent,
    resolve: {
      etapeExecution: EtapeExecutionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionEtapeExecution.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
