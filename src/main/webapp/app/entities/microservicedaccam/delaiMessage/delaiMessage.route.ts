import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DelaiMessageService } from './delaiMessage.service';
import { DelaiMessageComponent } from './delaiMessage.component';
import {DelaiMessage, IDelaiMessage} from "app/shared/model/microservicedaccam/delaiMessage.model";

@Injectable({ providedIn: 'root' })
export class DelaiMessageResolve implements Resolve<IDelaiMessage> {
  constructor(private service: DelaiMessageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDelaiMessage> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((delaiMessage: HttpResponse<DelaiMessage>) => delaiMessage.body));
    }
    return of(new DelaiMessage());
  }
}

export const delaiMessageRoute: Routes = [
  {
    path: '',
    component: DelaiMessageComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDelaiMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {


    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDelaiMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {

    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDelaiMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {

    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDelaiMessage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const candidatPopupRoute: Routes = [
  {

    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamDelaiMessage.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
