import { Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { OrdreCommandeComponent } from './ordre-commande.component';

export const ordreCommandeRoute: Routes = [
  {
    path: '',
    component: OrdreCommandeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'ordre-commande'
    },
    canActivate: [UserRouteAccessService]
  },
];


