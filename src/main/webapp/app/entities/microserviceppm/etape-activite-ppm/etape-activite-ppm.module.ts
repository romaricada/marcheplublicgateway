import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EtapeActivitePpmComponent } from './etape-activite-ppm.component';
import { etapeActivitePpmRoute } from './etape-activite-ppm.route';

const ENTITY_STATES = [...etapeActivitePpmRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EtapeActivitePpmComponent
  ],
  entryComponents: []
})
export class MicroserviceppmEtapeActivitePpmModule {}
