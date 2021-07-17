import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { Tache } from 'app/shared/model/microservicedaccam/tache.model';
import {ITacheEtape} from 'app/shared/model/microservicedaccam/tache-etape.model';
import {TacheEtapeComponent} from 'app/entities/microservicedaccam/tache-etape/tache-etape.component';

@Injectable({ providedIn: 'root' })
export class TacheEtapeResolve implements Resolve<ITacheEtape> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITacheEtape> {
    const id = route.params['id'];
    if (id) {
      return
    }
    return of(new Tache());
  }
}

export const tacheEtapeRoute: Routes = [
  {
    path: '',
    component: TacheEtapeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamTache.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

