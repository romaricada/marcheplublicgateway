import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ContentieuxComponent } from './contentieux.component';
import { contentieuxRoute } from './contentieux.route';

const ENTITY_STATES = [...contentieuxRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContentieuxComponent],
  entryComponents: []
})
export class MicroserviceexecutionContentieuxModule {}
