import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ReclamationCandidatLotComponent } from './reclamation-candidat-lot.component';
import {reclamationCandidatLotRoute} from './reclamation-candidat-lot.route';

const ENTITY_STATES = [...reclamationCandidatLotRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReclamationCandidatLotComponent
  ],
  entryComponents: []
})
export class MicroservicedaccamReclamationCandidatLotModule {}

