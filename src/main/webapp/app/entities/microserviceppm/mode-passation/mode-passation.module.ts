import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ModePassationComponent } from './mode-passation.component';
import { modePassationRoute } from './mode-passation.route';

const ENTITY_STATES = [...modePassationRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ModePassationComponent
  ],
  entryComponents: []
})
export class MicroserviceppmModePassationModule {}
