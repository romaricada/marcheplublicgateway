import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Penalite } from 'app/shared/model/microserviceexecution/penalite.model';
import { PenaliteService } from './penalite.service';
import { PenaliteComponent } from './penalite.component';
import { PenaliteDetailComponent } from './penalite-detail.component';
import { PenaliteUpdateComponent } from './penalite-update.component';
import { PenaliteDeletePopupComponent } from './penalite-delete-dialog.component';
import { IPenalite } from 'app/shared/model/microserviceexecution/penalite.model';

@Injectable({ providedIn: 'root' })
export class PenaliteResolve implements Resolve<IPenalite> {
  constructor(private service: PenaliteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPenalite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((penalite: HttpResponse<Penalite>) => penalite.body));
    }
    return of(new Penalite());
  }
}

export const penaliteRoute: Routes = [
  {
    path: '',
    component: PenaliteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionPenalite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PenaliteDetailComponent,
    resolve: {
      penalite: PenaliteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionPenalite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PenaliteUpdateComponent,
    resolve: {
      penalite: PenaliteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionPenalite.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PenaliteUpdateComponent,
    resolve: {
      penalite: PenaliteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionPenalite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const penalitePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PenaliteDeletePopupComponent,
    resolve: {
      penalite: PenaliteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionPenalite.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
