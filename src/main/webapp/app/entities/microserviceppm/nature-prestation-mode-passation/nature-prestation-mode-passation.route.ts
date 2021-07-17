import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NaturePrestationModePassationService } from './nature-prestation-mode-passation.service';
import {
  INaturePrestationModePassation,
  NaturePrestationModePassation
} from 'app/shared/model/microserviceppm/nature-prestation-mode-passation.model';
import { NaturePrestationModePassationComponent } from './nature-prestation-mode-passation.component';

@Injectable({ providedIn: 'root' })
export class NaturePrestationModePassationResolve implements Resolve<INaturePrestationModePassation> {
  constructor(private service: NaturePrestationModePassationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INaturePrestationModePassation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((naturePrestationModePassation: HttpResponse<NaturePrestationModePassation>) => naturePrestationModePassation.body));
    }
    return of(new NaturePrestationModePassation());
  }
}

export const naturePrestationModePassationRoutes: Routes = [
  {
    path: '',
    component: NaturePrestationModePassationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmNaturePrestationModePassation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NaturePrestationModePassationComponent,
    resolve: {
      naturePrestation: NaturePrestationModePassationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microserviceppmNaturePrestationModePassation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

