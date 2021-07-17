import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { AvisDacComponent } from './avis-dac.component';
import { avisDacRoute, candidatPopupRoute } from './avis-dac.route';

const ENTITY_STATES = [...avisDacRoute, ...candidatPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AvisDacComponent,
  ],
  entryComponents: []
})
export class MicroservicedaccamAvisDacModule {}
