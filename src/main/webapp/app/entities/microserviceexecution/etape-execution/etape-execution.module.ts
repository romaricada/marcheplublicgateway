import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EtapeExecutionComponent } from './etape-execution.component';
import { EtapeExecutionDetailComponent } from './etape-execution-detail.component';
import { EtapeExecutionUpdateComponent } from './etape-execution-update.component';
import { EtapeExecutionDeletePopupComponent, EtapeExecutionDeleteDialogComponent } from './etape-execution-delete-dialog.component';
import { etapeExecutionRoute, etapeExecutionPopupRoute } from './etape-execution.route';

const ENTITY_STATES = [...etapeExecutionRoute, ...etapeExecutionPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EtapeExecutionComponent,
    EtapeExecutionDetailComponent,
    EtapeExecutionUpdateComponent,
    EtapeExecutionDeleteDialogComponent,
    EtapeExecutionDeletePopupComponent
  ],
  entryComponents: [EtapeExecutionDeleteDialogComponent]
})
export class MicroserviceexecutionEtapeExecutionModule {}
