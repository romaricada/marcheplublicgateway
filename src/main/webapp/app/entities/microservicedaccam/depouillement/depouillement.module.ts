import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DepouillementComponent } from './depouillement.component';
import { depouillementRoute } from './depouillement.route';

const ENTITY_STATES = [...depouillementRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DepouillementComponent
  ],
  entryComponents: []
})
export class MicroservicedaccamDepouillementModule {}
