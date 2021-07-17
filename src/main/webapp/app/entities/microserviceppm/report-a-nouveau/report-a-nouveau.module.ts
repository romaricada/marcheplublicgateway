import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ReportANouveauComponent } from './report-a-nouveau.component';
import { reportANouveauRoute } from './report-a-nouveau.route';

const ENTITY_STATES = [...reportANouveauRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReportANouveauComponent
  ],
  entryComponents: []
})
export class MicroserviceppmReportANouveauModule {}
