import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';
import { TypeEntrepotService } from './type-entrepot.service';
import { TypeEntrepotComponent } from './type-entrepot.component';
import { TypeEntrepotDetailComponent } from './type-entrepot-detail.component';
import { TypeEntrepotUpdateComponent } from './type-entrepot-update.component';
import { TypeEntrepotDeletePopupComponent } from './type-entrepot-delete-dialog.component';
import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';

@Injectable({ providedIn: 'root' })
export class TypeEntrepotResolve implements Resolve<ITypeEntrepot> {
  constructor(private service: TypeEntrepotService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeEntrepot> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeEntrepot: HttpResponse<TypeEntrepot>) => typeEntrepot.body));
    }
    return of(new TypeEntrepot());
  }
}

export const typeEntrepotRoute: Routes = [
  {
    path: '',
    component: TypeEntrepotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeEntrepotDetailComponent,
    resolve: {
      typeEntrepot: TypeEntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeEntrepotUpdateComponent,
    resolve: {
      typeEntrepot: TypeEntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeEntrepotUpdateComponent,
    resolve: {
      typeEntrepot: TypeEntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeEntrepotPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeEntrepotDeletePopupComponent,
    resolve: {
      typeEntrepot: TypeEntrepotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeEntrepot.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
