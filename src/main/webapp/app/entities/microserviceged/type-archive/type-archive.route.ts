import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeArchive } from 'app/shared/model/microserviceged/type-archive.model';
import { TypeArchiveService } from './type-archive.service';
import { TypeArchiveComponent } from './type-archive.component';
import { TypeArchiveDetailComponent } from './type-archive-detail.component';
import { TypeArchiveUpdateComponent } from './type-archive-update.component';
import { TypeArchiveDeletePopupComponent } from './type-archive-delete-dialog.component';
import { ITypeArchive } from 'app/shared/model/microserviceged/type-archive.model';

@Injectable({ providedIn: 'root' })
export class TypeArchiveResolve implements Resolve<ITypeArchive> {
  constructor(private service: TypeArchiveService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeArchive> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeArchive: HttpResponse<TypeArchive>) => typeArchive.body));
    }
    return of(new TypeArchive());
  }
}

export const typeArchiveRoute: Routes = [
  {
    path: '',
    component: TypeArchiveComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeArchive.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeArchiveDetailComponent,
    resolve: {
      typeArchive: TypeArchiveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeArchive.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeArchiveUpdateComponent,
    resolve: {
      typeArchive: TypeArchiveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeArchive.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeArchiveUpdateComponent,
    resolve: {
      typeArchive: TypeArchiveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeArchive.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeArchivePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeArchiveDeletePopupComponent,
    resolve: {
      typeArchive: TypeArchiveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeArchive.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
