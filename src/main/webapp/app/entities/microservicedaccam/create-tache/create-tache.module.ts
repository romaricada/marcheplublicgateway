import { NgModule } from '@angular/core';
import {MarchepublicgatewaySharedModule} from "app/shared/shared.module";
import {CreateTacheComponent} from "app/entities/microservicedaccam/create-tache/create-tache.component";
import {createTacheRoute} from "app/entities/microservicedaccam/create-tache/create-tache.route";
import {RouterModule} from "@angular/router";

const ENTITY_STATES = [...createTacheRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CreateTacheComponent],
})
export class CreateTacheModule { }
