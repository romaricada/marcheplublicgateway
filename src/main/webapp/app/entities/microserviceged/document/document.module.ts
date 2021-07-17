import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { DocumentComponent } from './document.component';
import { documentRoute } from './document.route';

const ENTITY_STATES = [...documentRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocumentComponent,
    ],
  entryComponents: []
})
export class MicroservicegedDocumentModule {}
