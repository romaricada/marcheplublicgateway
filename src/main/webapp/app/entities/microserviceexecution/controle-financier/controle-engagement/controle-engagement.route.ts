import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ControleEngagementComponent } from './controle-engagement.component';
import {Engagement, IEngagement} from "app/shared/model/microserviceexecution/engagement.model";
import {EngagementService} from 'app/entities/microserviceexecution/engagement/engagement.service';

@Injectable({ providedIn: 'root' })
export class EngagementResolve implements Resolve<IEngagement> {
  constructor(private service: EngagementService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEngagement> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((engagement: HttpResponse<Engagement>) => engagement.body));
    }
    return of(new Engagement());
  }
}

export const controleEngagementRoute: Routes = [
  {
    path: '',
    component: ControleEngagementComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService]
  }
];

