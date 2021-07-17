import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExerciceBudgetaire } from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import { ExerciceBudgetaireService } from './exercice-budgetaire.service';
import { ExerciceBudgetaireComponent } from './exercice-budgetaire.component';
import { IExerciceBudgetaire } from 'app/shared/model/microserviceppm/exercice-budgetaire.model';

@Injectable({ providedIn: 'root' })
export class ExerciceBudgetaireResolve implements Resolve<IExerciceBudgetaire> {
  constructor(private service: ExerciceBudgetaireService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExerciceBudgetaire> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((exerciceBudgetaire: HttpResponse<ExerciceBudgetaire>) => exerciceBudgetaire.body));
    }
    return of(new ExerciceBudgetaire());
  }
}

export const exerciceBudgetaireRoute: Routes = [
  {
    path: '',
    component: ExerciceBudgetaireComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'exercice budgétaire'
    },
    canActivate: [UserRouteAccessService]
  }
];
