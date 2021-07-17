import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reclamation } from 'app/shared/model/microservicedaccam/reclamation.model';
import { ReclamationService } from './reclamation.service';
import { ReclamationComponent } from './reclamation.component';
import { IReclamation } from 'app/shared/model/microservicedaccam/reclamation.model';

@Injectable({ providedIn: 'root' })
export class ReclamationResolve implements Resolve<IReclamation> {
  constructor(private service: ReclamationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReclamation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((reclamation: HttpResponse<Reclamation>) => reclamation.body));
    }
    return of(new Reclamation());
  }
}

export const reclamationRoute: Routes = [
  {
    path: '',
    component: ReclamationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamReclamation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

