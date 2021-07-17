import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TacheComponent } from './tache.component';
import { TacheDetailComponent } from './tache-detail.component';
import { TacheUpdateComponent } from './tache-update.component';
import { TacheDeletePopupComponent, TacheDeleteDialogComponent } from './tache-delete-dialog.component';
import { tacheRoute, tachePopupRoute } from './tache.route';


const ENTITY_STATES = [...tacheRoute, ...tachePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TacheComponent, TacheDetailComponent, TacheUpdateComponent, TacheDeleteDialogComponent, TacheDeletePopupComponent],
  entryComponents: [TacheDeleteDialogComponent]
})
export class MicroservicedaccamTacheModule {}
