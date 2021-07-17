import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import {CalculDelaiComponent} from 'app/entities/microserviceppm/calcul-delai/calcul-delai.component';
import {calculDelaiRoute} from 'app/entities/microserviceppm/calcul-delai/calcul-delai.route';


const ENTITY_STATES = [...calculDelaiRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CalculDelaiComponent],
  entryComponents: []
})
export class MicroserviceppmCalculDelaiModule {}
