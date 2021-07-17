import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { CandidatComponent } from './candidat.component';
import { CandidatDetailComponent } from './candidat-detail.component';
import { CandidatUpdateComponent } from './candidat-update.component';
import { CandidatDeletePopupComponent, CandidatDeleteDialogComponent } from './candidat-delete-dialog.component';
import { candidatRoute, candidatPopupRoute } from './candidat.route';

const ENTITY_STATES = [...candidatRoute, ...candidatPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CandidatComponent,
    CandidatDetailComponent,
    CandidatUpdateComponent,
    CandidatDeleteDialogComponent,
    CandidatDeletePopupComponent
  ],
  entryComponents: [CandidatDeleteDialogComponent]
})
export class MicroservicedaccamCandidatModule {}
