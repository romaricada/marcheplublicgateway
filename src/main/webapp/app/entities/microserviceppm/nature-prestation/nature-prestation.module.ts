import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { NaturePrestationComponent } from './nature-prestation.component';
import { naturePrestationRoute } from './nature-prestation.route';

const ENTITY_STATES = [...naturePrestationRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    NaturePrestationComponent
  ],
  entryComponents: []
})
export class MicroserviceppmNaturePrestationModule {}
