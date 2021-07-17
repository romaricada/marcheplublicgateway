import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ControleEngagementComponent } from './controle-engagement.component';
import { controleEngagementRoute } from './controle-engagement.route';

const ENTITY_STATES = [...controleEngagementRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ControleEngagementComponent],
  entryComponents: []
})
export class MicroserviceexecutionControlCFEngagementModule {}
