import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Membre } from 'app/shared/model/microservicedaccam/membre.model';
import { MembreService } from './membre.service';
import { MembreComponent } from './membre.component';
import { MembreDetailComponent } from './membre-detail.component';
import { MembreUpdateComponent } from './membre-update.component';
import { MembreDeletePopupComponent } from './membre-delete-dialog.component';
import { IMembre } from 'app/shared/model/microservicedaccam/membre.model';

@Injectable({ providedIn: 'root' })
export class MembreResolve implements Resolve<IMembre> {
  constructor(private service: MembreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMembre> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((membre: HttpResponse<Membre>) => membre.body));
    }
    return of(new Membre());
  }
}

export const membreRoute: Routes = [
  {
    path: '',
    component: MembreComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamMembre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MembreDetailComponent,
    resolve: {
      membre: MembreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamMembre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MembreUpdateComponent,
    resolve: {
      membre: MembreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamMembre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MembreUpdateComponent,
    resolve: {
      membre: MembreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamMembre.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const membrePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MembreDeletePopupComponent,
    resolve: {
      membre: MembreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamMembre.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
