import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';
import { TacheWorkflowService } from './tache-workflow.service';
import { TacheWorkflowComponent } from './tache-workflow.component';
import { TacheWorkflowDetailComponent } from './tache-workflow-detail.component';
import { TacheWorkflowUpdateComponent } from './tache-workflow-update.component';
import { TacheWorkflowDeletePopupComponent } from './tache-workflow-delete-dialog.component';
import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';

@Injectable({ providedIn: 'root' })
export class TacheWorkflowResolve implements Resolve<ITacheWorkflow> {
  constructor(private service: TacheWorkflowService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITacheWorkflow> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((tacheWorkflow: HttpResponse<TacheWorkflow>) => tacheWorkflow.body));
    }
    return of(new TacheWorkflow());
  }
}

export const tacheWorkflowRoute: Routes = [
  {
    path: '',
    component: TacheWorkflowComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTacheWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TacheWorkflowDetailComponent,
    resolve: {
      tacheWorkflow: TacheWorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTacheWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TacheWorkflowUpdateComponent,
    resolve: {
      tacheWorkflow: TacheWorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTacheWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TacheWorkflowUpdateComponent,
    resolve: {
      tacheWorkflow: TacheWorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTacheWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tacheWorkflowPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TacheWorkflowDeletePopupComponent,
    resolve: {
      tacheWorkflow: TacheWorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTacheWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
