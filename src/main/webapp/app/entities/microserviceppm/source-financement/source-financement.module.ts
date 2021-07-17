import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { SourceFinancementComponent } from './source-financement.component';
import { sourceFinancementRoute } from './source-financement.route';

const ENTITY_STATES = [...sourceFinancementRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SourceFinancementComponent
  ],
  entryComponents: []
})
export class MicroserviceppmSourceFinancementModule {}
