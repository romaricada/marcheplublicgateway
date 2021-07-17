import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { StatutExecutionComponent } from './statut-execution.component';
import { StatutExecutionDetailComponent } from './statut-execution-detail.component';
import { StatutExecutionUpdateComponent } from './statut-execution-update.component';
import { StatutExecutionDeletePopupComponent, StatutExecutionDeleteDialogComponent } from './statut-execution-delete-dialog.component';
import { statutExecutionRoute, statutExecutionPopupRoute } from './statut-execution.route';

const ENTITY_STATES = [...statutExecutionRoute, ...statutExecutionPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StatutExecutionComponent,
    StatutExecutionDetailComponent,
    StatutExecutionUpdateComponent,
    StatutExecutionDeleteDialogComponent,
    StatutExecutionDeletePopupComponent
  ],
  entryComponents: [StatutExecutionDeleteDialogComponent]
})
export class MicroserviceexecutionStatutExecutionModule {}
