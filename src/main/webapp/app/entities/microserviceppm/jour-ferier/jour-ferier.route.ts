import { Injectable } from '@angular/core';
import {IJourFerier, JourFerier} from "app/shared/model/microserviceppm/jour-ferier.model";
import {ActivatedRouteSnapshot, Resolve, Routes} from "@angular/router";
import {JourFerierService} from "app/entities/microserviceppm/jour-ferier/jour-ferier.service";
import {Observable, of} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {JourFerierComponent} from "app/entities/microserviceppm/jour-ferier/jour-ferier.component";
import {JhiResolvePagingParams} from "ng-jhipster";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ActeurResolve implements Resolve<IJourFerier> {
  constructor(private service: JourFerierService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJourFerier> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((jourFerier: HttpResponse<JourFerier>) => jourFerier.body));
    }
    return of(new JourFerier());
  }
}

export const jourFerierRoute: Routes = [
  {
    path: '',
    component: JourFerierComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Jour Ferier'
    },
    canActivate: [UserRouteAccessService]
  }

];
