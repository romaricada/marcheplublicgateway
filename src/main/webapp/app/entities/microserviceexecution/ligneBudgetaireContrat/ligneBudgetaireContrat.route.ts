import {Routes} from "@angular/router";

import {JhiResolvePagingParams} from "ng-jhipster";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";
import {LigneBudgetaireContratComponent} from "app/entities/microserviceexecution/ligneBudgetaireContrat/ligneBudgetaireContrat.component";

export const ligneBudgetaireContratRoute: Routes = [
  {
    path: '',
    component: LigneBudgetaireContratComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService]
  }
];

