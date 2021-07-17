import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TypeCommissionComponent } from './type-commission.component';
import { TypeCommissionDetailComponent } from './type-commission-detail.component';
import { TypeCommissionUpdateComponent } from './type-commission-update.component';
import { TypeCommissionDeletePopupComponent, TypeCommissionDeleteDialogComponent } from './type-commission-delete-dialog.component';
import { typeCommissionRoute, typeCommissionPopupRoute } from './type-commission.route';

const ENTITY_STATES = [...typeCommissionRoute, ...typeCommissionPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeCommissionComponent,
    TypeCommissionDetailComponent,
    TypeCommissionUpdateComponent,
    TypeCommissionDeleteDialogComponent,
    TypeCommissionDeletePopupComponent
  ],
  entryComponents: [TypeCommissionDeleteDialogComponent]
})
export class MicroservicedaccamTypeCommissionModule {}
