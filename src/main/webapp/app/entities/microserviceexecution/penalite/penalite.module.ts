import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { PenaliteComponent } from './penalite.component';
import { PenaliteDetailComponent } from './penalite-detail.component';
import { PenaliteUpdateComponent } from './penalite-update.component';
import { PenaliteDeletePopupComponent, PenaliteDeleteDialogComponent } from './penalite-delete-dialog.component';
import { penaliteRoute, penalitePopupRoute } from './penalite.route';

const ENTITY_STATES = [...penaliteRoute, ...penalitePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PenaliteComponent,
    PenaliteDetailComponent,
    PenaliteUpdateComponent,
    PenaliteDeleteDialogComponent,
    PenaliteDeletePopupComponent
  ],
  entryComponents: [PenaliteDeleteDialogComponent]
})
export class MicroserviceexecutionPenaliteModule {}
