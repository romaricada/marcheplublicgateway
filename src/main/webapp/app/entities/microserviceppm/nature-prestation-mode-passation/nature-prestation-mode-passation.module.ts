import { NgModule } from '@angular/core';
import { NaturePrestationModePassationComponent } from './nature-prestation-mode-passation.component';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import {
  naturePrestationModePassationRoutes
} from './nature-prestation-mode-passation.route';

const ENTITY_STATES = [...naturePrestationModePassationRoutes];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [NaturePrestationModePassationComponent],
  entryComponents: []
})
export class NaturePrestationModePassationModule {}
