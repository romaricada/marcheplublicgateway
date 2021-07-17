import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DeliberationComponent } from './deliberation.component';
import { deliberationRoute } from './deliberation.route';

const ENTITY_STATES = [...deliberationRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [DeliberationComponent],
  entryComponents: []
})
export class MicroservicedaccamDeliberationModule {}
