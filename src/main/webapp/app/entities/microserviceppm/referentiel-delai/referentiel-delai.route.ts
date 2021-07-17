import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReferentielDelai } from 'app/shared/model/microserviceppm/referentiel-delai.model';
import { ReferentielDelaiService } from './referentiel-delai.service';
import { ReferentielDelaiComponent } from './referentiel-delai.component';
import { IReferentielDelai } from 'app/shared/model/microserviceppm/referentiel-delai.model';

@Injectable({ providedIn: 'root' })
export class ReferentielDelaiResolve implements Resolve<IReferentielDelai> {
  constructor(private service: ReferentielDelaiService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReferentielDelai> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((referentielDelai: HttpResponse<ReferentielDelai>) => referentielDelai.body));
    }
    return of(new ReferentielDelai());
  }
}

export const referentielDelaiRoute: Routes = [
  {
    path: '',
    component: ReferentielDelaiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmReferentielDelai.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

