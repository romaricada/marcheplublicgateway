import {ligneBudgetaireEngagementRoute} from "app/entities/microserviceexecution/ligneBudgetaireEngagement/ligneBudgetaireEngagement.route";
import {MarchepublicgatewaySharedModule} from "app/shared/shared.module";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LigneBudgetaireEngagementComponent} from "app/entities/microserviceexecution/ligneBudgetaireEngagement/ligneBudgetaireEngagement.component";

const ENTITY_STATES = [...ligneBudgetaireEngagementRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LigneBudgetaireEngagementComponent],
  entryComponents: []
})
export class MicroserviceexecutionLigneBudgetaireEngagementModule {}
