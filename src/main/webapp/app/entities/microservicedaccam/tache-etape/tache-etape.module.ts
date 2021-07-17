import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {tacheEtapeRoute} from 'app/entities/microservicedaccam/tache-etape/tache-etape.route';
import {TacheEtapeComponent} from 'app/entities/microservicedaccam/tache-etape/tache-etape.component';

const ENTITY_STATES = [...tacheEtapeRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TacheEtapeComponent],
  entryComponents: []
})
export class MicroservicedaccamTacheEtapeModule {}
