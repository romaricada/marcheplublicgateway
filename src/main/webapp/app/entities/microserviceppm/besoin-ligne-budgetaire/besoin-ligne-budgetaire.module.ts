import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { BesoinLigneBudgetaireComponent } from './besoin-ligne-budgetaire.component';

import { besoinLigneBudgetaireRoute } from './besoin-ligne-budgetaire.route';

const ENTITY_STATES = [...besoinLigneBudgetaireRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BesoinLigneBudgetaireComponent
  ],
  entryComponents: []
})
export class MicroserviceppmBesoinLigneBudgetaireModule {}
