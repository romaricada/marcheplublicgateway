import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BesoinLigneBudgetaire } from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import { BesoinLigneBudgetaireService } from './besoin-ligne-budgetaire.service';
import { BesoinLigneBudgetaireComponent } from './besoin-ligne-budgetaire.component';
import { IBesoinLigneBudgetaire } from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';

@Injectable({ providedIn: 'root' })
export class BesoinLigneBudgetaireResolve implements Resolve<IBesoinLigneBudgetaire> {
  constructor(private service: BesoinLigneBudgetaireService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBesoinLigneBudgetaire> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((besoinLigneBudgetaire: HttpResponse<BesoinLigneBudgetaire>) => besoinLigneBudgetaire.body));
    }
    return of(new BesoinLigneBudgetaire());
  }
}

export const besoinLigneBudgetaireRoute: Routes = [
  {
    path: '',
    component: BesoinLigneBudgetaireComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmBesoinLigneBudgetaire.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
