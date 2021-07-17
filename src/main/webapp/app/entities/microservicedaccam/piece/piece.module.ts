import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {piecePopupRoute, pieceRoute} from 'app/entities/microservicedaccam/piece/piece.route';
import {PieceComponent} from 'app/entities/microservicedaccam/piece/piece.component';
import {PieceDetailComponent} from 'app/entities/microservicedaccam/piece/piece-detail.component';
import {PieceUpdateComponent} from 'app/entities/microservicedaccam/piece/piece-update.component';
import {
  PieceDeleteDialogComponent,
  PieceDeletePopupComponent
} from 'app/entities/microservicedaccam/piece/piece-delete-dialog.component';

const ENTITY_STATES = [...pieceRoute, ...piecePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PieceComponent,
    PieceDetailComponent,
    PieceUpdateComponent,
    PieceDeleteDialogComponent,
    PieceDeletePopupComponent
  ],
  entryComponents: [PieceDeleteDialogComponent]
})
export class MicroservicedaccamPieceModule {}
