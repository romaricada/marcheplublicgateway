import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AvisDacService } from './avis-dac.service';
import { AvisDacComponent } from './avis-dac.component';
import {AvisDac, IAvisDac} from 'app/shared/model/microservicedaccam/avis-dac.model';


@Injectable({ providedIn: 'root' })
export class CandidatResolve implements Resolve<IAvisDac> {
  constructor(private service: AvisDacService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvisDac> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((avisDac: HttpResponse<AvisDac>) => avisDac.body));
    }
    return of(new AvisDac());
  }
}

export const avisDacRoute: Routes = [
  {
    path: '',
    component: AvisDacComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Dac'
    },
    canActivate: [UserRouteAccessService]
  },
];

export const candidatPopupRoute: Routes = [
];
