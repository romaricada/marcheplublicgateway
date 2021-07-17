import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contentieux } from 'app/shared/model/microserviceexecution/contentieux.model';
import { ContentieuxService } from './contentieux.service';
import { ContentieuxComponent } from './contentieux.component';
import { IContentieux } from 'app/shared/model/microserviceexecution/contentieux.model';

@Injectable({ providedIn: 'root' })
export class ContentieuxResolve implements Resolve<IContentieux> {
  constructor(private service: ContentieuxService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentieux> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((contentieux: HttpResponse<Contentieux>) => contentieux.body));
    }
    return of(new Contentieux());
  }
}

export const contentieuxRoute: Routes = [
  {
    path: '',
    component: ContentieuxComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionContentieux.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

