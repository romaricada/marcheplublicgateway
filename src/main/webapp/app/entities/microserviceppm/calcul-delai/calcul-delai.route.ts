import { Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {CalculDelaiComponent} from 'app/entities/microserviceppm/calcul-delai/calcul-delai.component';


export const calculDelaiRoute: Routes = [
  {
    path: '',
    component: CalculDelaiComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'calcul-delai'
    },
    canActivate: [UserRouteAccessService]
  }
];
