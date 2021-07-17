import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ReferentielDelaiComponent } from './referentiel-delai.component';
import { referentielDelaiRoute } from './referentiel-delai.route';

const ENTITY_STATES = [...referentielDelaiRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReferentielDelaiComponent
  ],
  entryComponents: []
})
export class MicroserviceppmReferentielDelaiModule {}
