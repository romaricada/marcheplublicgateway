import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';
import { TypeAvenantService } from './type-avenant.service';
import { TypeAvenantComponent } from './type-avenant.component';
import { TypeAvenantDetailComponent } from './type-avenant-detail.component';
import { TypeAvenantUpdateComponent } from './type-avenant-update.component';
import { TypeAvenantDeletePopupComponent } from './type-avenant-delete-dialog.component';
import { ITypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';

@Injectable({ providedIn: 'root' })
export class TypeAvenantResolve implements Resolve<ITypeAvenant> {
  constructor(private service: TypeAvenantService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeAvenant> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeAvenant: HttpResponse<TypeAvenant>) => typeAvenant.body));
    }
    return of(new TypeAvenant());
  }
}

export const typeAvenantRoute: Routes = [
  {
    path: '',
    component: TypeAvenantComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionTypeAvenant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeAvenantDetailComponent,
    resolve: {
      typeAvenant: TypeAvenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionTypeAvenant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeAvenantUpdateComponent,
    resolve: {
      typeAvenant: TypeAvenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionTypeAvenant.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeAvenantUpdateComponent,
    resolve: {
      typeAvenant: TypeAvenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionTypeAvenant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeAvenantPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeAvenantDeletePopupComponent,
    resolve: {
      typeAvenant: TypeAvenantResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionTypeAvenant.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
