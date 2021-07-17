import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deliberation } from 'app/shared/model/microservicedaccam/deliberation.model';
import { EtatService } from './etat.service';
import { EtatComponent } from './etat.component';
import { IDeliberation } from 'app/shared/model/microservicedaccam/deliberation.model';

@Injectable({ providedIn: 'root' })
export class DeliberationResolve implements Resolve<IDeliberation> {
  constructor(private service: EtatService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliberation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((deliberation: HttpResponse<Deliberation>) => deliberation.body));
    }
    return of(new Deliberation());
  }
}

export const etatRoute: Routes = [
  {
    path: '',
    component: EtatComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamEtat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
