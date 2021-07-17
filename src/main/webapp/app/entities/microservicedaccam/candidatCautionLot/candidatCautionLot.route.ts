import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {TypeCautionService} from 'app/entities/microservicedaccam/type-caution/type-caution.service';
import {Caution} from 'app/shared/model/microservicedaccam/caution.model';
import {CandidatCautionLot} from "app/shared/model/microservicedaccam/candidatCautionLot.model";
import {CandidatCautionLotComponent} from "app/entities/microservicedaccam/candidatCautionLot/candidatCautionLot.component";

@Injectable({ providedIn: 'root' })
export class CautionResolve implements Resolve<Caution> {
  constructor(private service: TypeCautionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CandidatCautionLot> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((caution: HttpResponse<CandidatCautionLot>) => caution.body));
    }
    return of(new CandidatCautionLot());
  }
}

export const candidatCautionLotRoute: Routes = [
  {
    path: '',
    component: CandidatCautionLotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'caution'
    },
    canActivate: [UserRouteAccessService]
  },
];
