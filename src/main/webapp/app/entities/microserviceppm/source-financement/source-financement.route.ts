import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SourceFinancement } from 'app/shared/model/microserviceppm/source-financement.model';
import { SourceFinancementService } from './source-financement.service';
import { SourceFinancementComponent } from './source-financement.component';
import { ISourceFinancement } from 'app/shared/model/microserviceppm/source-financement.model';

@Injectable({ providedIn: 'root' })
export class SourceFinancementResolve implements Resolve<ISourceFinancement> {
  constructor(private service: SourceFinancementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISourceFinancement> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((sourceFinancement: HttpResponse<SourceFinancement>) => sourceFinancement.body));
    }
    return of(new SourceFinancement());
  }
}

export const sourceFinancementRoute: Routes = [
  {
    path: '',
    component: SourceFinancementComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmSourceFinancement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
