import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Locale } from 'app/shared/model/microserviceged/locale.model';
import { LocaleService } from './locale.service';
import { LocaleComponent } from './locale.component';
import { LocaleDetailComponent } from './locale-detail.component';
import { LocaleUpdateComponent } from './locale-update.component';
import { LocaleDeletePopupComponent } from './locale-delete-dialog.component';
import { ILocale } from 'app/shared/model/microserviceged/locale.model';

@Injectable({ providedIn: 'root' })
export class LocaleResolve implements Resolve<ILocale> {
  constructor(private service: LocaleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILocale> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((locale: HttpResponse<Locale>) => locale.body));
    }
    return of(new Locale());
  }
}

export const localeRoute: Routes = [
  {
    path: '',
    component: LocaleComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedLocale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LocaleDetailComponent,
    resolve: {
      locale: LocaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedLocale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LocaleUpdateComponent,
    resolve: {
      locale: LocaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedLocale.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LocaleUpdateComponent,
    resolve: {
      locale: LocaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedLocale.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const localePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LocaleDeletePopupComponent,
    resolve: {
      locale: LocaleResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedLocale.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
