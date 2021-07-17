import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Depouillement } from 'app/shared/model/microservicedaccam/depouillement.model';
import { DepouillementService } from './depouillement.service';
import { DepouillementComponent } from './depouillement.component';
import { IDepouillement } from 'app/shared/model/microservicedaccam/depouillement.model';

@Injectable({ providedIn: 'root' })
export class DepouillementResolve implements Resolve<IDepouillement> {
  constructor(private service: DepouillementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepouillement> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((depouillement: HttpResponse<Depouillement>) => depouillement.body));
    }
    return of(new Depouillement());
  }
}

export const depouillementRoute: Routes = [
  {
    path: '',
    component: DepouillementComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDepouillement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
   /* ,
  {
    path: ':id/view',
    component: DepouillementDetailComponent,
    resolve: {
      depouillement: DepouillementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDepouillement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepouillementUpdateComponent,
    resolve: {
      depouillement: DepouillementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDepouillement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepouillementUpdateComponent,
    resolve: {
      depouillement: DepouillementResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDepouillement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }*/
];

