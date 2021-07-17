import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ActiviteComponent } from './activite.component';
import { activiteRoute } from './activite.route';

const ENTITY_STATES = [...activiteRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ActiviteComponent
  ],
  entryComponents: []
})
export class MicroserviceppmActiviteModule {}
