import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etape } from 'app/shared/model/microserviceppm/etape.model';
import { EtapeService } from './etape.service';
import { EtapeComponent } from './etape.component';
import { IEtape } from 'app/shared/model/microserviceppm/etape.model';

@Injectable({ providedIn: 'root' })
export class EtapeResolve implements Resolve<IEtape> {
  constructor(private service: EtapeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtape> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((etape: HttpResponse<Etape>) => etape.body));
    }
    return of(new Etape());
  }
}

export const etapeRoute: Routes = [
  {
    path: '',
    component: EtapeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmEtape.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
