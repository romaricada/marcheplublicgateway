import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Besoin } from 'app/shared/model/microserviceppm/besoin.model';
import { BesoinService } from './besoin.service';
import { BesoinComponent } from './besoin.component';
import { IBesoin } from 'app/shared/model/microserviceppm/besoin.model';

@Injectable({ providedIn: 'root' })
export class BesoinResolve implements Resolve<IBesoin> {
  constructor(private service: BesoinService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBesoin> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((besoin: HttpResponse<Besoin>) => besoin.body));
    }
    return of(new Besoin());
  }
}

export const besoinRoute: Routes = [
  {
    path: '',
    component: BesoinComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'sous-ppm'
    },
    canActivate: [UserRouteAccessService]
  }
];

