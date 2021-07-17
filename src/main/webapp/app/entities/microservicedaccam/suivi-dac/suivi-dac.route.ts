import {Injectable} from "@angular/core";
import {Resolve, Routes} from "@angular/router";
import {JhiResolvePagingParams} from "ng-jhipster";
import {UserRouteAccessService} from "app/core/auth/user-route-access-service";
import {SuiviDacComponent} from "app/entities/microservicedaccam/suivi-dac/suivi-dac.component";

@Injectable({ providedIn: 'root' })
export class SuiviDacRoute implements Resolve<any> {
  constructor() {}

  resolve(): any {
    return {};
  }
}

export const suiviDacRoute: Routes = [
  {
    path: '',
    component: SuiviDacComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: ''
    },
    canActivate: [UserRouteAccessService]
  }
  ];
