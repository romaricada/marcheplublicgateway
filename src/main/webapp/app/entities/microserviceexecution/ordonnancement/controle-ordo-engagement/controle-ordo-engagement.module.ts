import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ControleOrdoEngagementComponent } from './controle-ordo-engagement.component';
import { controleOrdoEngagementRoute } from './controle-ordo-engagement.route';

const ENTITY_STATES = [...controleOrdoEngagementRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ControleOrdoEngagementComponent],
  entryComponents: []
})
export class MicroserviceexecutionControlOrdoEngagementModule {}
