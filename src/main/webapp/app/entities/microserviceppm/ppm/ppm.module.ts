import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { PPMComponent } from './ppm.component';
import { pPMRoute } from './ppm.route';

const ENTITY_STATES = [...pPMRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PPMComponent],
  entryComponents: []
})
export class MicroserviceppmPPMModule {}
