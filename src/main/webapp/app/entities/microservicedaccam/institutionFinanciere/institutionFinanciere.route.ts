import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInstitutionFinanciere, InstitutionFinanciere } from 'app/shared/model/microservicedaccam/institutionFinanciere.model';
import { InstitutionFinanciereService } from './institutionFinanciere.service';
import { InstitutionFinanciereComponent } from './institutionFinanciere.component';

@Injectable({ providedIn: 'root' })
export class InstitutionFinanciereResolve implements Resolve<IInstitutionFinanciere> {
  constructor(private service: InstitutionFinanciereService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInstitutionFinanciere> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((institutionFinanciere: HttpResponse<InstitutionFinanciere>) => institutionFinanciere.body));
    }
    return of(new InstitutionFinanciere());
  }
}

export const institutionFinanciereRoute: Routes = [
  {
    path: '',
    component: InstitutionFinanciereComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'institution-financiere'
    },
    canActivate: [UserRouteAccessService]
  }
];
