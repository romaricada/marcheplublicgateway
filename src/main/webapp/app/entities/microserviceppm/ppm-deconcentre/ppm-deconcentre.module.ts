import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {ppmDeconcentreRoute} from 'app/entities/microserviceppm/ppm-deconcentre/ppm-deconcentre.route';
import {PpmDeconcentreComponent} from 'app/entities/microserviceppm/ppm-deconcentre/ppm-deconcentre.component';

const ENTITY_STATES = [...ppmDeconcentreRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PpmDeconcentreComponent],
  entryComponents: []
})
export class MicroserviceppmDeconcentreModule {}
