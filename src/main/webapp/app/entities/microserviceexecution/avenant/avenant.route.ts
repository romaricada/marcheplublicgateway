import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Avenant } from 'app/shared/model/microserviceexecution/avenant.model';
import { AvenantService } from './avenant.service';
import { AvenantComponent } from './avenant.component';
import { IAvenant } from 'app/shared/model/microserviceexecution/avenant.model';

@Injectable({ providedIn: 'root' })
export class AvenantResolve implements Resolve<IAvenant> {
  constructor(private service: AvenantService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvenant> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((avenant: HttpResponse<Avenant>) => avenant.body));
    }
    return of(new Avenant());
  }
}

export const avenantRoute: Routes = [
  {
    path: '',
    component: AvenantComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceexecutionAvenant.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

