import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypeDocument } from 'app/shared/model/microserviceged/type-document.model';
import { TypeDocumentService } from './type-document.service';
import { TypeDocumentComponent } from './type-document.component';
import { TypeDocumentDetailComponent } from './type-document-detail.component';
import { TypeDocumentUpdateComponent } from './type-document-update.component';
import { TypeDocumentDeletePopupComponent } from './type-document-delete-dialog.component';
import { ITypeDocument } from 'app/shared/model/microserviceged/type-document.model';

@Injectable({ providedIn: 'root' })
export class TypeDocumentResolve implements Resolve<ITypeDocument> {
  constructor(private service: TypeDocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeDocument> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((typeDocument: HttpResponse<TypeDocument>) => typeDocument.body));
    }
    return of(new TypeDocument());
  }
}

export const typeDocumentRoute: Routes = [
  {
    path: '',
    component: TypeDocumentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TypeDocumentDetailComponent,
    resolve: {
      typeDocument: TypeDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TypeDocumentUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TypeDocumentUpdateComponent,
    resolve: {
      typeDocument: TypeDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const typeDocumentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TypeDocumentDeletePopupComponent,
    resolve: {
      typeDocument: TypeDocumentResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicegedTypeDocument.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
