import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MarchepublicgatewaySharedModule} from 'app/shared/shared.module';
import {besoinActiviteRoute} from 'app/entities/microserviceppm/besoin-activite/besoin-activite.route';
import {BesoinActiviteComponent} from 'app/entities/microserviceppm/besoin-activite/besoin-activite.component';

const ENTITY_STATES = [...besoinActiviteRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BesoinActiviteComponent],
  entryComponents: []
})
export class MicroserviceppmBesoinActiviteModule {
}
