import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { OrdreCommandeComponent } from './ordre-commande.component';
import { ordreCommandeRoute } from './ordre-commande.route';

const ENTITY_STATES = [...ordreCommandeRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OrdreCommandeComponent,
  ],
  entryComponents: []
})
export class MicroserviceexecutionOrdreCommandeModule {}
