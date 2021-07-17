import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { BesoinComponent } from './besoin.component';
import { besoinRoute } from './besoin.route';

const ENTITY_STATES = [...besoinRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BesoinComponent],
  entryComponents: []
})
export class MicroserviceppmBesoinModule {}
