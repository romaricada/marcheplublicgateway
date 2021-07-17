import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MarchepublicgatewaySharedModule} from 'app/shared/shared.module';
import {CandidatLotComponent} from './candidat-lot.component';
import {candidatLotRoute} from './candidat-lot.route';

const ENTITY_STATES = [...candidatLotRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CandidatLotComponent],
  entryComponents: []
})
export class MicroservicedaccamCandidatLotModule {
}
