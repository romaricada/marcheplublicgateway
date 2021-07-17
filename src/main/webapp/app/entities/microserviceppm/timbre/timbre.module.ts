import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TimbreComponent } from './timbre.component';
import { timbreRoute } from './timbre.route';

const ENTITY_STATES = [...timbreRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TimbreComponent],
  entryComponents: []
})
export class MicroserviceppmTimbreModule {}
