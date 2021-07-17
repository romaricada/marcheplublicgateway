import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ContratComponent } from './contrat.component';
import { contratRoute, contratPopupRoute } from './contrat.route';

const ENTITY_STATES = [...contratRoute, ...contratPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContratComponent],
  entryComponents: []
})
export class MicroserviceexecutionContratModule {}
