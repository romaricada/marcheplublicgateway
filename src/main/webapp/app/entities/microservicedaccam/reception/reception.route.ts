import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {Observable, of} from 'rxjs';
import {Reception} from 'app/shared/model/microservicedaccam/reception.model';
import {ReceptionService} from './reception.service';
import {ReceptionComponent} from './reception.component';
import {ReceptionDetailComponent} from './reception-detail.component';
import {ReceptionUpdateComponent} from './reception-update.component';
import {ReceptionDeletePopupComponent} from './reception-delete-dialog.component';
import {IReception} from 'app/shared/model/microservicedaccam/reception.model';

@Injectable({providedIn: 'root'})
export class ReceptionResolve implements Resolve<IReception> {
    constructor(private service: ReceptionService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<IReception> {
        const id = route.params['id'];
        if (id) {
            //  return this.service.find(id).pipe(map((reception: HttpResponse<Reception>) => reception.body));
        }
        return of(new Reception());
    }
}

export const receptionRoute: Routes = [
    {
        path: '',
        component: ReceptionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'marchepublicgatewayApp.microservicedaccamReception.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ReceptionDetailComponent,
        resolve: {
            reception: ReceptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'marchepublicgatewayApp.microservicedaccamReception.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ReceptionUpdateComponent,
        resolve: {
            reception: ReceptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'marchepublicgatewayApp.microservicedaccamReception.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ReceptionUpdateComponent,
        resolve: {
            reception: ReceptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'marchepublicgatewayApp.microservicedaccamReception.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receptionPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ReceptionDeletePopupComponent,
        resolve: {
            reception: ReceptionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'marchepublicgatewayApp.microservicedaccamReception.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
