import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timbre } from 'app/shared/model/microserviceppm/timbre.model';
import { TimbreService } from './timbre.service';
import { TimbreComponent } from './timbre.component';
import { ITimbre } from 'app/shared/model/microserviceppm/timbre.model';

@Injectable({ providedIn: 'root' })
export class TimbreResolve implements Resolve<ITimbre> {
  constructor(private service: TimbreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITimbre> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((timbre: HttpResponse<Timbre>) => timbre.body));
    }
    return of(new Timbre());
  }
}

export const timbreRoute: Routes = [
  {
    path: '',
    component: TimbreComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmTimbre.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
