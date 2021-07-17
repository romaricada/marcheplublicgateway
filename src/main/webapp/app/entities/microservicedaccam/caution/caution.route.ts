import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {TypeCautionService} from 'app/entities/microservicedaccam/type-caution/type-caution.service';
import {CautionComponent} from 'app/entities/microservicedaccam/caution/caution.component';
import {Caution} from 'app/shared/model/microservicedaccam/caution.model';

@Injectable({ providedIn: 'root' })
export class CautionResolve implements Resolve<Caution> {
  constructor(private service: TypeCautionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Caution> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((caution: HttpResponse<Caution>) => caution.body));
    }
    return of(new Caution());
  }
}

export const cautionRoute: Routes = [
  {
    path: '',
    component: CautionComponent,
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
