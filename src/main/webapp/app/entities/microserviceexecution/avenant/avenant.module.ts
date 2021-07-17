import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { AvenantComponent } from './avenant.component';
import {avenantRoute} from 'app/entities/microserviceexecution/avenant/avenant.route';
const ENTITY_STATES = [...avenantRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AvenantComponent],
  entryComponents: []
})
export class MicroserviceexecutionAvenantModule {}
