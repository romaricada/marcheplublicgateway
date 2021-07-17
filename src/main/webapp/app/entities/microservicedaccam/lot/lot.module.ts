import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {lotRoute} from 'app/entities/microservicedaccam/lot/lot.route';
import {LotComponent} from 'app/entities/microservicedaccam/lot/lot.component';

const ENTITY_STATES = [...lotRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LotComponent],
  entryComponents: []
})
export class MicroservicedaccamLotModule {}
