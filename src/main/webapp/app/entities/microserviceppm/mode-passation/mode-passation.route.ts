import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';
import { ModePassationService } from './mode-passation.service';
import { ModePassationComponent } from './mode-passation.component';
import { IModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';

@Injectable({ providedIn: 'root' })
export class ModePassationResolve implements Resolve<IModePassation> {
  constructor(private service: ModePassationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModePassation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((modePassation: HttpResponse<ModePassation>) => modePassation.body));
    }
    return of(new ModePassation());
  }
}

export const modePassationRoute: Routes = [
  {
    path: '',
    component: ModePassationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmModePassation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
