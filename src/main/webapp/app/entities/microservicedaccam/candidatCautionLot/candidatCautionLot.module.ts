import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {candidatCautionLotRoute} from "app/entities/microservicedaccam/candidatCautionLot/candidatCautionLot.route";
import {CandidatCautionLotComponent} from "app/entities/microservicedaccam/candidatCautionLot/candidatCautionLot.component";

const ENTITY_STATES = [...candidatCautionLotRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CandidatCautionLotComponent,
  ],
  entryComponents: []
})
export class MicroservicedaccamCandidatCautionLotModule {}
