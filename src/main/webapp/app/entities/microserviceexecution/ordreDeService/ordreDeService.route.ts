import {Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {OrdreDeServiceComponent} from "./ordreDeService.component";

export const ordreDeServiceRoute: Routes = [
    {
        path: '',
        component: OrdreDeServiceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'ordre-service'
        },
        canActivate: [UserRouteAccessService]
    },
];
