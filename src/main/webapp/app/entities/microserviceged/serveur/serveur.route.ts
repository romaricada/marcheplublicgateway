import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Serveur } from 'app/shared/model/microserviceged/serveur.model';
import { ServeurService } from './serveur.service';
import { ServeurComponent } from './serveur.component';
import { ServeurDetailComponent } from './serveur-detail.component';
import { ServeurUpdateComponent } from './serveur-update.component';
import { ServeurDeletePopupComponent } from './serveur-delete-dialog.component';
import { IServeur } from 'app/shared/model/microserviceged/serveur.model';

@Injectable({ providedIn: 'root' })
export class ServeurResolve implements Resolve<IServeur> {
  constructor(private service: ServeurService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServeur> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((serveur: HttpResponse<Serveur>) => serveur.body));
    }
    return of(new Serveur());
  }
}

export const serveurRoute: Routes = [
  {
    path: '',
    component: ServeurComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedServeur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ServeurDetailComponent,
    resolve: {
      serveur: ServeurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedServeur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ServeurUpdateComponent,
    resolve: {
      serveur: ServeurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedServeur.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ServeurUpdateComponent,
    resolve: {
      serveur: ServeurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedServeur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const serveurPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ServeurDeletePopupComponent,
    resolve: {
      serveur: ServeurResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedServeur.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
