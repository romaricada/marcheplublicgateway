import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tache } from 'app/shared/model/microservicedaccam/tache.model';
import { TacheService } from './tache.service';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';
import { TacheDeletePopupComponent } from './tache-delete-dialog.component';
import { ITache } from 'app/shared/model/microservicedaccam/tache.model';

@Injectable({ providedIn: 'root' })
export class TacheResolve implements Resolve<ITache> {
  constructor(private service: TacheService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITache> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((tache: HttpResponse<Tache>) => tache.body));
    }
    return of(new Tache());
  }
}

export const tacheRoute: Routes = [
  {
    path: '',
    component: TacheComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TacheDetailComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TacheUpdateComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tachePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TacheDeletePopupComponent,
    resolve: {
      tache: TacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
