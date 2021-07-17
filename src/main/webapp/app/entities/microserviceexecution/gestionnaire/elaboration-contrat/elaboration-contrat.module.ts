import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { elaborationContratRoute } from './elaboration-contrat.route';
import {
  ContratDialogComponent
} from 'app/entities/microserviceexecution/gestionnaire/elaboration-contrat/elaboration-contrat-dialog.component';
import {ElaborationContratComponent} from 'app/entities/microserviceexecution/gestionnaire/elaboration-contrat/elaboration-contrat.component';

const ENTITY_STATES = [...elaborationContratRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ElaborationContratComponent, ContratDialogComponent],
  entryComponents: []
})
export class MicroserviceexecutionElabContratModule {}
