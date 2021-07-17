import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DecisionComponent } from './decision.component';
import { DecisionDetailComponent } from './decision-detail.component';
import { DecisionUpdateComponent } from './decision-update.component';
import { DecisionDeletePopupComponent, DecisionDeleteDialogComponent } from './decision-delete-dialog.component';
import { decisionRoute, decisionPopupRoute } from './decision.route';

const ENTITY_STATES = [...decisionRoute, ...decisionPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DecisionComponent,
    DecisionDetailComponent,
    DecisionUpdateComponent,
    DecisionDeleteDialogComponent,
    DecisionDeletePopupComponent
  ],
  entryComponents: [DecisionDeleteDialogComponent]
})
export class MicroservicedaccamDecisionModule {}
