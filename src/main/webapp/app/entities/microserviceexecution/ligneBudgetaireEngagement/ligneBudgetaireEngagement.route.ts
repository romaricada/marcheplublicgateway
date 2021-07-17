import {Routes} from "@angular/router";
import {JhiResolvePagingParams} from "ng-jhipster";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";
import {LigneBudgetaireEngagementComponent} from "app/entities/microserviceexecution/ligneBudgetaireEngagement/ligneBudgetaireEngagement.component";

export const ligneBudgetaireEngagementRoute: Routes = [
  {
    path: '',
    component: LigneBudgetaireEngagementComponent,
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

