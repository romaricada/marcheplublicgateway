import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';
import { PieceCandidatService } from './piece-candidat.service';
import { PieceCandidatComponent } from './piece-candidat.component';
import { PieceCandidatDetailComponent } from './piece-candidat-detail.component';
import { PieceCandidatUpdateComponent } from './piece-candidat-update.component';
import { PieceCandidatDeletePopupComponent } from './piece-candidat-delete-dialog.component';
import { IPieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';

@Injectable({ providedIn: 'root' })
export class PieceCandidatResolve implements Resolve<IPieceCandidat> {
  constructor(private service: PieceCandidatService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPieceCandidat> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((pieceCandidat: HttpResponse<PieceCandidat>) => pieceCandidat.body));
    }
    return of(new PieceCandidat());
  }
}

export const pieceCandidatRoute: Routes = [
  {
    path: '',
    component: PieceCandidatComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microservicedaccamPieceCandidat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PieceCandidatDetailComponent,
    resolve: {
      pieceCandidat: PieceCandidatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamPieceCandidat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PieceCandidatUpdateComponent,
    resolve: {
      pieceCandidat: PieceCandidatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamPieceCandidat.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PieceCandidatUpdateComponent,
    resolve: {
      pieceCandidat: PieceCandidatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamPieceCandidat.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pieceCandidatPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PieceCandidatDeletePopupComponent,
    resolve: {
      pieceCandidat: PieceCandidatResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'marchepublicgatewayApp.microservicedaccamPieceCandidat.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
