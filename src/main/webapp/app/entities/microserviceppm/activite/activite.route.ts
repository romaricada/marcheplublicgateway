import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activite } from 'app/shared/model/microserviceppm/activite.model';
import { ActiviteService } from './activite.service';
import { ActiviteComponent } from './activite.component';
import { IActivite } from 'app/shared/model/microserviceppm/activite.model';

@Injectable({ providedIn: 'root' })
export class ActiviteResolve implements Resolve<IActivite> {
  constructor(private service: ActiviteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActivite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((activite: HttpResponse<Activite>) => activite.body));
    }
    return of(new Activite());
  }
}

export const activiteRoute: Routes = [
  {
    path: '',
    component: ActiviteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmActivite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
