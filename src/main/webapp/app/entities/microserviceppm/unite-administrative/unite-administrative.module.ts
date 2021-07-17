import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { uniteAdministrativeRoute } from './unite-administrative.route';
import {UniteAdministrativeComponent} from 'app/entities/microserviceppm/unite-administrative/unite-administrative.component';

const ENTITY_STATES = [...uniteAdministrativeRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UniteAdministrativeComponent
  ],
  entryComponents: []
})
export class MicroserviceppmUniteAdministrativeModule {}
