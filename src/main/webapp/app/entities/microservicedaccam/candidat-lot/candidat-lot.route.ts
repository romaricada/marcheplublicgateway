import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CandidatLot } from 'app/shared/model/microservicedaccam/candidat-lot.model';
import { CandidatLotService } from './candidat-lot.service';
import { CandidatLotComponent } from './candidat-lot.component';
import { ICandidatLot } from 'app/shared/model/microservicedaccam/candidat-lot.model';

@Injectable({ providedIn: 'root' })
export class CandidatLotResolve implements Resolve<ICandidatLot> {
  constructor(private service: CandidatLotService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidatLot> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((candidatLot: HttpResponse<CandidatLot>) => candidatLot.body));
    }
    return of(new CandidatLot());
  }
}

export const candidatLotRoute: Routes = [
  {
    path: '',
    component: CandidatLotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamCandidatLot.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

