import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Acteur } from 'app/shared/model/microserviceppm/acteur.model';
import { ActeurService } from './acteur.service';
import { ActeurComponent } from './acteur.component';
import { IActeur } from 'app/shared/model/microserviceppm/acteur.model';

@Injectable({ providedIn: 'root' })
export class ActeurResolve implements Resolve<IActeur> {
  constructor(private service: ActeurService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IActeur> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((acteur: HttpResponse<Acteur>) => acteur.body));
    }
    return of(new Acteur());
  }
}

export const acteurRoute: Routes = [
  {
    path: '',
    component: ActeurComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmActeur.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
