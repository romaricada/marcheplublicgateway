import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UniteAdministrative } from 'app/shared/model/microserviceppm/unite-administrative.model';
import { UniteAdministrativeService } from './unite-administrative.service';
import { UniteAdministrativeComponent } from './unite-administrative.component';
import { IUniteAdministrative } from 'app/shared/model/microserviceppm/unite-administrative.model';

@Injectable({ providedIn: 'root' })
export class UniteAdministrativeResolve implements Resolve<IUniteAdministrative> {
  constructor(private service: UniteAdministrativeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUniteAdministrative> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((uniteAdministrative: HttpResponse<UniteAdministrative>) => uniteAdministrative.body));
    }
    return of(new UniteAdministrative());
  }
}

export const uniteAdministrativeRoute: Routes = [
  {
    path: '',
    component: UniteAdministrativeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmUniteAdministrative.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
