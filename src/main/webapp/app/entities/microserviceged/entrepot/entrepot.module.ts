import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EntrepotComponent } from './entrepot.component';
import { EntrepotDetailComponent } from './entrepot-detail.component';
import { EntrepotUpdateComponent } from './entrepot-update.component';
import { EntrepotDeletePopupComponent, EntrepotDeleteDialogComponent } from './entrepot-delete-dialog.component';
import { entrepotRoute, entrepotPopupRoute } from './entrepot.route';

const ENTITY_STATES = [...entrepotRoute, ...entrepotPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EntrepotComponent,
    EntrepotDetailComponent,
    EntrepotUpdateComponent,
    EntrepotDeleteDialogComponent,
    EntrepotDeletePopupComponent
  ],
  entryComponents: [EntrepotDeleteDialogComponent]
})
export class MicroservicegedEntrepotModule {}
