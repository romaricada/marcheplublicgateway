import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EtatComponent } from './etat.component';
import { etatRoute } from './etat.route';

const ENTITY_STATES = [...etatRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [EtatComponent],
  entryComponents: []
})
export class MicroservicedaccamEtatModule {}
