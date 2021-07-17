import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ExerciceBudgetaireComponent } from './exercice-budgetaire.component';
import { exerciceBudgetaireRoute } from './exercice-budgetaire.route';
import {SpinnerModule} from "primeng/spinner";

const ENTITY_STATES = [...exerciceBudgetaireRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES), SpinnerModule],
  declarations: [ExerciceBudgetaireComponent],
  entryComponents: []
})
export class MicroserviceppmExerciceBudgetaireModule {}
