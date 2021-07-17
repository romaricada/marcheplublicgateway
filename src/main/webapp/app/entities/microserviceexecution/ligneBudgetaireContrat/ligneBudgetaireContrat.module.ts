import {MarchepublicgatewaySharedModule} from "app/shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ligneBudgetaireContratRoute} from "app/entities/microserviceexecution/ligneBudgetaireContrat/ligneBudgetaireContrat.route";
import {LigneBudgetaireContratComponent} from "app/entities/microserviceexecution/ligneBudgetaireContrat/ligneBudgetaireContrat.component";

const ENTITY_STATES = [...ligneBudgetaireContratRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LigneBudgetaireContratComponent],
  entryComponents: []
})
export class MicroserviceexecutionLigneBudgetaireContratModule {}
