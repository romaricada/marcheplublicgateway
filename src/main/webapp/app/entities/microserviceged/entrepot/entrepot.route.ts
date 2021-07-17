import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Entrepot } from 'app/shared/model/microserviceged/entrepot.model';
import { EntrepotService } from './entrepot.service';
import { EntrepotComponent } from './entrepot.component';
import { EntrepotDetailComponent } from './entrepot-detail.component';
import { EntrepotUpdateComponent } from './entrepot-update.component';
import { EntrepotDeletePopupComponent } from './entrepot-delete-dialog.component';
import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';

@Injectable({ providedIn: 'root' })
export class EntrepotResolve implements Resolve<IEntrepot> {
  constructor(private service: EntrepotService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEntrepot> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((entrepot: HttpResponse<Entrepot>) => entrepot.body));
    }
    return of(new Entrepot());
  }
}

export const entrepotRoute: Routes = [
  {
    path: '',
    component: EntrepotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EntrepotDetailComponent,
    resolve: {
      entrepot: EntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EntrepotUpdateComponent,
    resolve: {
      entrepot: EntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EntrepotUpdateComponent,
    resolve: {
      entrepot: EntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const entrepotPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EntrepotDeletePopupComponent,
    resolve: {
      entrepot: EntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
