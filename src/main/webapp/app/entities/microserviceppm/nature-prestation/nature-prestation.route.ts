import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';
import { NaturePrestationService } from './nature-prestation.service';
import { NaturePrestationComponent } from './nature-prestation.component';
import { INaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';

@Injectable({ providedIn: 'root' })
export class NaturePrestationResolve implements Resolve<INaturePrestation> {
  constructor(private service: NaturePrestationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INaturePrestation> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((naturePrestation: HttpResponse<NaturePrestation>) => naturePrestation.body));
    }
    return of(new NaturePrestation());
  }
}

export const naturePrestationRoute: Routes = [
  {
    path: '',
    component: NaturePrestationComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmNaturePrestation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
