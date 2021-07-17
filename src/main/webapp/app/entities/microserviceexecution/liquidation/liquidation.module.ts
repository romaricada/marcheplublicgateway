import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { LiquidationComponent } from './liquidation.component';
import { liquidationRoute } from './liquidation.route';

const ENTITY_STATES = [...liquidationRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LiquidationComponent,
  ],
  entryComponents: []
})
export class MicroserviceexecutionLiquidationModule {}
