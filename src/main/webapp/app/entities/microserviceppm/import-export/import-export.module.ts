import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { importExportRoute } from 'app/entities/microserviceppm/import-export/import-export.route';
import { ImportExportComponent } from 'app/entities/microserviceppm/import-export/import-export.component';

const ENTITY_STATES = [...importExportRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ImportExportComponent],
  entryComponents: []
})
export class MicroserviceppmImportExportModule {}
