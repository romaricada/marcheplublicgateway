import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Workflow } from 'app/shared/model/microservicedaccam/workflow.model';
import { WorkflowService } from './workflow.service';
import { WorkflowComponent } from './workflow.component';
import { WorkflowDetailComponent } from './workflow-detail.component';
import { WorkflowUpdateComponent } from './workflow-update.component';
import { WorkflowDeletePopupComponent } from './workflow-delete-dialog.component';
import { IWorkflow } from 'app/shared/model/microservicedaccam/workflow.model';

@Injectable({ providedIn: 'root' })
export class WorkflowResolve implements Resolve<IWorkflow> {
  constructor(private service: WorkflowService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWorkflow> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((workflow: HttpResponse<Workflow>) => workflow.body));
    }
    return of(new Workflow());
  }
}

export const workflowRoute: Routes = [
  {
    path: '',
    component: WorkflowComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: WorkflowDetailComponent,
    resolve: {
      workflow: WorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: WorkflowUpdateComponent,
    resolve: {
      workflow: WorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: WorkflowUpdateComponent,
    resolve: {
      workflow: WorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const workflowPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: WorkflowDeletePopupComponent,
    resolve: {
      workflow: WorkflowResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamWorkflow.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
