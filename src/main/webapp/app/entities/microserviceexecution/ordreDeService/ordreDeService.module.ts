import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';

import { ordreDeServiceRoute } from './ordreDeService.route';
import {OrdreDeServiceComponent} from "./ordreDeService.component";

const ENTITY_STATES = [...ordreDeServiceRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdreDeServiceComponent
  ],
  entryComponents: []
})
export class MicroserviceexecutionOrdreDeServiceModule {}
