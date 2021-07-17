import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { PpmActiviteComponent } from './ppm-activite.component';
import { ppmActiviteRoute, } from './ppm-activite.route';

const ENTITY_STATES = [...ppmActiviteRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PpmActiviteComponent],
  entryComponents: []
})
export class MicroserviceppmPpmActiviteModule {}
