import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EtapeComponent } from './etape.component';
import { etapeRoute } from './etape.route';

const ENTITY_STATES = [...etapeRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EtapeComponent],
  entryComponents: []
})
export class MicroserviceppmEtapeModule {}
