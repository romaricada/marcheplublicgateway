import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LigneBudgetaire } from 'app/shared/model/microserviceppm/ligne-budgetaire.model';
import { LigneBudgetaireService } from './ligne-budgetaire.service';
import { LigneBudgetaireComponent } from './ligne-budgetaire.component';
import { ILigneBudgetaire } from 'app/shared/model/microserviceppm/ligne-budgetaire.model';

@Injectable({ providedIn: 'root' })
export class LigneBudgetaireResolve implements Resolve<ILigneBudgetaire> {
  constructor(private service: LigneBudgetaireService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILigneBudgetaire> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ligneBudgetaire: HttpResponse<LigneBudgetaire>) => ligneBudgetaire.body));
    }
    return of(new LigneBudgetaire());
  }
}

export const ligneBudgetaireRoute: Routes = [
  {
    path: '',
    component: LigneBudgetaireComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmLigneBudgetaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
