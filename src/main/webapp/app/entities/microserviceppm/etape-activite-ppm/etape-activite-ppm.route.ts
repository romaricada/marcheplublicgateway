import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EtapeActivitePpm } from 'app/shared/model/microserviceppm/etape-activite-ppm.model';
import { EtapeActivitePpmService } from './etape-activite-ppm.service';
import { EtapeActivitePpmComponent } from './etape-activite-ppm.component';
import { IEtapeActivitePpm } from 'app/shared/model/microserviceppm/etape-activite-ppm.model';

@Injectable({ providedIn: 'root' })
export class EtapeActivitePpmResolve implements Resolve<IEtapeActivitePpm> {
  constructor(private service: EtapeActivitePpmService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtapeActivitePpm> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((etapeActivitePpm: HttpResponse<EtapeActivitePpm>) => etapeActivitePpm.body));
    }
    return of(new EtapeActivitePpm());
  }
}

export const etapeActivitePpmRoute: Routes = [
  {
    path: '',
    component: EtapeActivitePpmComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmEtapeActivitePpm.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
