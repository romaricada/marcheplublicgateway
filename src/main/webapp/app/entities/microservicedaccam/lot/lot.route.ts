import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Candidat } from 'app/shared/model/microservicedaccam/candidat.model';
import { ICandidat } from 'app/shared/model/microservicedaccam/candidat.model';
import {LotService} from 'app/entities/microservicedaccam/lot/lot.service';
import {LotComponent} from 'app/entities/microservicedaccam/lot/lot.component';

@Injectable({ providedIn: 'root' })
export class LotResolve implements Resolve<ICandidat> {
  constructor(private service: LotService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICandidat> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((candidat: HttpResponse<Candidat>) => candidat.body));
    }
    return of(new Candidat());
  }
}

export const lotRoute: Routes = [
  {
    path: '',
    component: LotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamCandidat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

