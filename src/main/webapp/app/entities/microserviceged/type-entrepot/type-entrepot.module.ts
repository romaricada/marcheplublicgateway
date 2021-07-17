import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TypeEntrepotComponent } from './type-entrepot.component';
import { TypeEntrepotDetailComponent } from './type-entrepot-detail.component';
import { TypeEntrepotUpdateComponent } from './type-entrepot-update.component';
import { TypeEntrepotDeletePopupComponent, TypeEntrepotDeleteDialogComponent } from './type-entrepot-delete-dialog.component';
import { typeEntrepotRoute, typeEntrepotPopupRoute } from './type-entrepot.route';

const ENTITY_STATES = [...typeEntrepotRoute, ...typeEntrepotPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeEntrepotComponent,
    TypeEntrepotDetailComponent,
    TypeEntrepotUpdateComponent,
    TypeEntrepotDeleteDialogComponent,
    TypeEntrepotDeletePopupComponent
  ],
  entryComponents: [TypeEntrepotDeleteDialogComponent]
})
export class MicroservicegedTypeEntrepotModule {}
