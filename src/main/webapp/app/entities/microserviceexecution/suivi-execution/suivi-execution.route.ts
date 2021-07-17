
import { Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {SuiviExecutionComponent} from "app/entities/microserviceexecution/suivi-execution/suivi-execution.component";

export const suiviExecutionRoute: Routes = [
  {
    path: '',
    component: SuiviExecutionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'suivi-execution'
    },
    canActivate: [UserRouteAccessService]
  },

];
