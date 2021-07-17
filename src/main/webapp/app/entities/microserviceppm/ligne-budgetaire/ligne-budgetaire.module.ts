import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { LigneBudgetaireComponent } from './ligne-budgetaire.component';
import { ligneBudgetaireRoute } from './ligne-budgetaire.route';

const ENTITY_STATES = [...ligneBudgetaireRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LigneBudgetaireComponent
  ],
  entryComponents: []
})
export class MicroserviceppmLigneBudgetaireModule {}
