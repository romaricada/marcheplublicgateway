import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';
import { TypeCommissionService } from './type-commission.service';
import { TypeCommissionComponent } from './type-commission.component';
import { TypeCommissionDetailComponent } from './type-commission-detail.component';
import { TypeCommissionUpdateComponent } from './type-commission-update.component';
import { TypeCommissionDeletePopupComponent } from './type-commission-delete-dialog.component';
import { ITypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';

@Injectable({ providedIn: 'root' })
export class TypeCommissionResolve implements Resolve<ITypeCommission> {
  constructor(private service: TypeCommissionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeCommission> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeCommission: HttpResponse<TypeCommission>) => typeCommission.body));
    }
    return of(new TypeCommission());
  }
}

export const typeCommissionRoute: Routes = [
  {
    path: '',
    component: TypeCommissionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTypeCommission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeCommissionDetailComponent,
    resolve: {
      typeCommission: TypeCommissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTypeCommission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeCommissionUpdateComponent,
    resolve: {
      typeCommission: TypeCommissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTypeCommission.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeCommissionUpdateComponent,
    resolve: {
      typeCommission: TypeCommissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTypeCommission.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeCommissionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeCommissionDeletePopupComponent,
    resolve: {
      typeCommission: TypeCommissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTypeCommission.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
