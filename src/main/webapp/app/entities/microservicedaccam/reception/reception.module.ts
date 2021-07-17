import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ReceptionComponent } from './reception.component';
import { ReceptionDetailComponent } from './reception-detail.component';
import { ReceptionUpdateComponent } from './reception-update.component';
import { ReceptionDeletePopupComponent, ReceptionDeleteDialogComponent } from './reception-delete-dialog.component';
import { receptionRoute, receptionPopupRoute } from './reception.route';

const ENTITY_STATES = [...receptionRoute, ...receptionPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReceptionComponent,
    ReceptionDetailComponent,
    ReceptionUpdateComponent,
    ReceptionDeleteDialogComponent,
    ReceptionDeletePopupComponent
  ],
  entryComponents: [ReceptionDeleteDialogComponent]
})
export class MicroservicedaccamReceptionModule {}
