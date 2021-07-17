import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { InstitutionFinanciereComponent } from './institutionFinanciere.component';
import { institutionFinanciereRoute, } from './institutionFinanciere.route';

const ENTITY_STATES = [...institutionFinanciereRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    InstitutionFinanciereComponent,
  ],
  entryComponents: []
})
export class MicroservicedaccamInstitutionFinanciereModule {}
