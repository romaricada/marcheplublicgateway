import {Injectable} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Resolve, ActivatedRouteSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';
import {UserRouteAccessService} from 'app/core/auth/user-route-access-service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {MembreCommission} from 'app/shared/model/microservicedaccam/membre-commission.model';
import {MembreCommissionService} from './membre-commission.service';
import {MembreCommissionComponent} from './membre-commission.component';
import {IMembreCommission} from 'app/shared/model/microservicedaccam/membre-commission.model';

@Injectable({providedIn: 'root'})
export class MembreCommissionResolve implements Resolve<IMembreCommission> {
    constructor(private service: MembreCommissionService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<IMembreCommission> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(map((membreCommission: HttpResponse<MembreCommission>) => membreCommission.body));
        }
        return of(new MembreCommission());
    }
}

export const membreCommissionRoute: Routes = [
    {
        path: '',
        component: MembreCommissionComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'marchepublicgatewayApp.microservicedaccamMembreCommission.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const membreCommissionPopupRoute: Routes = [
    /* {
      path: ':id/delete',
      component: MembreCommissionDeletePopupComponent,
      resolve: {
        membreCommission: MembreCommissionResolve
      },
      data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'marchepublicgatewayApp.microservicedaccamMembreCommission.home.title'
      },
      canActivate: [UserRouteAccessService],
      outlet: 'popup'
    } */
];
