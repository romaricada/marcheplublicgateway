import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TypeAvenantComponent } from './type-avenant.component';
import { TypeAvenantDetailComponent } from './type-avenant-detail.component';
import { TypeAvenantUpdateComponent } from './type-avenant-update.component';
import { TypeAvenantDeletePopupComponent, TypeAvenantDeleteDialogComponent } from './type-avenant-delete-dialog.component';
import { typeAvenantRoute, typeAvenantPopupRoute } from './type-avenant.route';

const ENTITY_STATES = [...typeAvenantRoute, ...typeAvenantPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeAvenantComponent,
    TypeAvenantDetailComponent,
    TypeAvenantUpdateComponent,
    TypeAvenantDeleteDialogComponent,
    TypeAvenantDeletePopupComponent
  ],
  entryComponents: [TypeAvenantDeleteDialogComponent]
})
export class MicroserviceexecutionTypeAvenantModule {}
