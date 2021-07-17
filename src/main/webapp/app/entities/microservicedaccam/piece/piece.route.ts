import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';
import { IPieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';
import {IPiece, Piece} from 'app/shared/model/microservicedaccam/piece.model';
import {PieceService} from 'app/entities/microservicedaccam/piece/piece.service';
import {PieceComponent} from 'app/entities/microservicedaccam/piece/piece.component';
import {PieceDeletePopupComponent} from 'app/entities/microservicedaccam/piece/piece-delete-dialog.component';
import {PieceDetailComponent} from 'app/entities/microservicedaccam/piece/piece-detail.component';
import {PieceUpdateComponent} from 'app/entities/microservicedaccam/piece/piece-update.component';

@Injectable({ providedIn: 'root' })
export class PieceResolve implements Resolve<IPiece> {
  constructor(private service: PieceService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPieceCandidat> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((piece: HttpResponse<PieceCandidat>) => piece.body));
    }
    return of(new Piece());
  }
}

export const pieceRoute: Routes = [
  {
    path: '',
    component: PieceComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'pièce'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PieceDetailComponent,
    resolve: {
      piece: PieceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pièce'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PieceUpdateComponent,
    resolve: {
      piece: PieceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pièce'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PieceUpdateComponent,
    resolve: {
      piece: PieceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pièce'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const piecePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PieceDeletePopupComponent,
    resolve: {
      piece: PieceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'pièce'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
