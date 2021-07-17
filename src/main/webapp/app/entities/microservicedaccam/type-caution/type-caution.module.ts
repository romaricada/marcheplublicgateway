import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {typeCautionRoute} from 'app/entities/microservicedaccam/type-caution/type-caution.route';
import {TypeCautionComponent} from "app/entities/microservicedaccam/type-caution/type-caution.component";


const ENTITY_STATES = [...typeCautionRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TypeCautionComponent],
  entryComponents: []
})
export class MicroservicedaccamTypeCautionModule {}
