import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ActeurComponent } from './acteur.component';
import { acteurRoute } from './acteur.route';

const ENTITY_STATES = [...acteurRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ActeurComponent],
  entryComponents: []
})
export class MicroserviceppmActeurModule {}
