import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';

import { suiviExecutionRoute } from './suivi-execution.route';
import {SuiviExecutionComponent} from "app/entities/microserviceexecution/suivi-execution/suivi-execution.component";

const ENTITY_STATES = [...suiviExecutionRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SuiviExecutionComponent
  ],
  entryComponents: []
})
export class MicroserviceexecutionSuiviExecutionModule {}
