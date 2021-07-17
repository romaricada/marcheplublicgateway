import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReclamationCandidatLotService } from './reclamation-candidat-lot.service';
import { ReclamationCandidatLotComponent } from './reclamation-candidat-lot.component';
import {
  IReclamationCandidatLot,
  ReclamationCandidatLot
} from "app/shared/model/microservicedaccam/reclamation-candidat-lot.model";


@Injectable({ providedIn: 'root' })
export class ReclamationCandidatLotResolve implements Resolve<IReclamationCandidatLot> {
  constructor(private service: ReclamationCandidatLotService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReclamationCandidatLot> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((reclamationCandidatLot: HttpResponse<IReclamationCandidatLot >) => reclamationCandidatLot.body));
    }
    return of(new ReclamationCandidatLot());
  }
}

export const reclamationCandidatLotRoute: Routes = [
  {
    path: '',
    component: ReclamationCandidatLotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'reclamtion-candidat'
    },
    canActivate: [UserRouteAccessService]
  },

];

