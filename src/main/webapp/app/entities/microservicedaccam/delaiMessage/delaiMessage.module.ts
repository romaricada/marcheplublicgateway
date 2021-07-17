import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DelaiMessageComponent } from './delaiMessage.component';

import { delaiMessageRoute, candidatPopupRoute } from './delaiMessage.route';

const ENTITY_STATES = [...delaiMessageRoute, ...candidatPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DelaiMessageComponent,

  ],
  entryComponents: []
})
export class MicroservicedaccamDelaiMessageModule {}
