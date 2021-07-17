import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from 'app/shared/model/microserviceged/document.model';
import { DocumentService } from './document.service';
import { DocumentComponent } from './document.component';
import { IDocument } from 'app/shared/model/microserviceged/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentResolve implements Resolve<IDocument> {
  constructor(private service: DocumentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocument> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((document: HttpResponse<Document>) => document.body));
    }
    return of(new Document());
  }
}

export const documentRoute: Routes = [
  {
    path: '',
    component: DocumentComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicegedDocument.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
