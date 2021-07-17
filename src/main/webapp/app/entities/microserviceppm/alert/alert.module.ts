import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {alertRoute} from 'app/entities/microserviceppm/alert/alert.route';
import {AlertComponent} from 'app/entities/microserviceppm/alert/alert.component';



const ENTITY_STATES = [...alertRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AlertComponent
  ],
  entryComponents: []
})
export class MicroserviceppmAlertModule {}
