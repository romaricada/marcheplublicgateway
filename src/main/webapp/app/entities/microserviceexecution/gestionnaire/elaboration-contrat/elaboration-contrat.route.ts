import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {Observable, of} from 'rxjs';
import { ElaborationContratService } from './elaboration-contrat.service';
import { ElaborationContratComponent } from './elaboration-contrat.component';
import {Contrat, IContrat} from 'app/shared/model/microserviceexecution/contrat.model';
import {
  ContratDialogComponent
} from 'app/entities/microserviceexecution/gestionnaire/elaboration-contrat/elaboration-contrat-dialog.component';
import {map} from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContratResolve implements Resolve<IContrat> {
  constructor(private service: ElaborationContratService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContrat> {
    const id = route.params['id'];
    if (id) {
      return this.service.findById(id).pipe(map((contrat: HttpResponse<Contrat>) => contrat.body));
    }
    return of(new Contrat());
  }
}

export const elaborationContratRoute: Routes = [
  {
    path: '',
    component: ElaborationContratComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionContrat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContratDialogComponent,
    resolve: {
      contrat: ContratResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Detail contrat'
    },
    canActivate: [UserRouteAccessService]
  }
];
