import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {CautionComponent} from 'app/entities/microservicedaccam/caution/caution.component';
import {cautionRoute} from 'app/entities/microservicedaccam/caution/caution.route';

const ENTITY_STATES = [...cautionRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CautionComponent,
  ],
  entryComponents: []
})
export class MicroservicedaccamCautionModule {}
