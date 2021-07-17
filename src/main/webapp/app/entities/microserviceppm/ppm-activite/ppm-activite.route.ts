import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';
import { PpmActiviteService } from './ppm-activite.service';
import { PpmActiviteComponent } from './ppm-activite.component';
import { IPpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';

@Injectable({ providedIn: 'root' })
export class PpmActiviteResolve implements Resolve<IPpmActivite> {
  constructor(private service: PpmActiviteService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPpmActivite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ppmActivite: HttpResponse<PpmActivite>) => ppmActivite.body));
    }
    return of(new PpmActivite());
  }
}

export const ppmActiviteRoute: Routes = [
  {
    path: '',
    component: PpmActiviteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmPpmActivite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
