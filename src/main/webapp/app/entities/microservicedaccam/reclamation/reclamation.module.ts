import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ReclamationComponent } from './reclamation.component';
import { reclamationRoute } from './reclamation.route';
const ENTITY_STATES = [...reclamationRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ReclamationComponent],
  entryComponents: []
})
export class MicroservicedaccamReclamationModule {}
