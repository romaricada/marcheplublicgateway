import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PPM } from 'app/shared/model/microserviceppm/ppm.model';
import { PPMService } from './ppm.service';
import { PPMComponent } from './ppm.component';
import { IPPM } from 'app/shared/model/microserviceppm/ppm.model';

@Injectable({ providedIn: 'root' })
export class PPMResolve implements Resolve<IPPM> {
  constructor(private service: PPMService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPPM> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((pPM: HttpResponse<PPM>) => pPM.body));
    }
    return of(new PPM());
  }
}

export const pPMRoute: Routes = [
  {
    path: '',
    component: PPMComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmPPm.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
