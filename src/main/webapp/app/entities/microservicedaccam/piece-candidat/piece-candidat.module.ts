import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { PieceCandidatComponent } from './piece-candidat.component';
import { PieceCandidatDetailComponent } from './piece-candidat-detail.component';
import { PieceCandidatUpdateComponent } from './piece-candidat-update.component';
import { PieceCandidatDeletePopupComponent, PieceCandidatDeleteDialogComponent } from './piece-candidat-delete-dialog.component';
import { pieceCandidatRoute, pieceCandidatPopupRoute } from './piece-candidat.route';

const ENTITY_STATES = [...pieceCandidatRoute, ...pieceCandidatPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PieceCandidatComponent,
    PieceCandidatDetailComponent,
    PieceCandidatUpdateComponent,
    PieceCandidatDeleteDialogComponent,
    PieceCandidatDeletePopupComponent
  ],
  entryComponents: [PieceCandidatDeleteDialogComponent]
})
export class MicroservicedaccamPieceCandidatModule {}
