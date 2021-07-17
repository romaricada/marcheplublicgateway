import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DecisionContentieuxComponent } from './decision-contentieux.component';
import { DecisionContentieuxDetailComponent } from './decision-contentieux-detail.component';
import { DecisionContentieuxUpdateComponent } from './decision-contentieux-update.component';
import {
  DecisionContentieuxDeletePopupComponent,
  DecisionContentieuxDeleteDialogComponent
} from './decision-contentieux-delete-dialog.component';
import { decisionContentieuxRoute, decisionContentieuxPopupRoute } from './decision-contentieux.route';

const ENTITY_STATES = [...decisionContentieuxRoute, ...decisionContentieuxPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DecisionContentieuxComponent,
    DecisionContentieuxDetailComponent,
    DecisionContentieuxUpdateComponent,
    DecisionContentieuxDeleteDialogComponent,
    DecisionContentieuxDeletePopupComponent
  ],
  entryComponents: [DecisionContentieuxDeleteDialogComponent]
})
export class MicroserviceexecutionDecisionContentieuxModule {}
