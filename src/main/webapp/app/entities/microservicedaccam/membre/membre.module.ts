import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { MembreComponent } from './membre.component';
import { MembreDetailComponent } from './membre-detail.component';
import { MembreUpdateComponent } from './membre-update.component';
import { MembreDeletePopupComponent, MembreDeleteDialogComponent } from './membre-delete-dialog.component';
import { membreRoute, membrePopupRoute } from './membre.route';

const ENTITY_STATES = [...membreRoute, ...membrePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MembreComponent, MembreDetailComponent, MembreUpdateComponent, MembreDeleteDialogComponent, MembreDeletePopupComponent],
  entryComponents: [MembreDeleteDialogComponent]
})
export class MicroservicedaccamMembreModule {}
