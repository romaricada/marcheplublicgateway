import { NgModule } from '@angular/core';
import {MarchepublicgatewaySharedModule} from "app/shared/shared.module";
import {RouterModule} from "@angular/router";
import {suiviDacRoute} from "app/entities/microservicedaccam/suivi-dac/suivi-dac.route";
import {SuiviDacComponent} from "app/entities/microservicedaccam/suivi-dac/suivi-dac.component";

const ENTITY_STATES = [...suiviDacRoute];

@NgModule({
  declarations: [SuiviDacComponent],
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)]
})
export class SuiviDacModule { }
