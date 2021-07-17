import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { JourFerierComponent } from './jour-ferier.component';
import {jourFerierRoute} from "app/entities/microserviceppm/jour-ferier/jour-ferier.route";



const ENTITY_STATES = [...jourFerierRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    JourFerierComponent
  ],
  entryComponents: []
})
export class MicroserviceppmJourFerierModule {}
