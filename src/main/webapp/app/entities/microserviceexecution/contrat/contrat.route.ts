import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contrat } from 'app/shared/model/microserviceexecution/contrat.model';
import { ContratService } from './contrat.service';
import { ContratComponent } from './contrat.component';
import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';

@Injectable({ providedIn: 'root' })
export class ContratResolve implements Resolve<IContrat> {
  constructor(private service: ContratService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContrat> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((contrat: HttpResponse<Contrat>) => contrat.body));
    }
    return of(new Contrat());
  }
}

export const contratRoute: Routes = [
  {
    path: '',
    component: ContratComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionContrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contratPopupRoute: Routes = [
  {}
];
