import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { ServeurComponent } from './serveur.component';
import { ServeurDetailComponent } from './serveur-detail.component';
import { ServeurUpdateComponent } from './serveur-update.component';
import { ServeurDeletePopupComponent, ServeurDeleteDialogComponent } from './serveur-delete-dialog.component';
import { serveurRoute, serveurPopupRoute } from './serveur.route';

const ENTITY_STATES = [...serveurRoute, ...serveurPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ServeurComponent,
    ServeurDetailComponent,
    ServeurUpdateComponent,
    ServeurDeleteDialogComponent,
    ServeurDeletePopupComponent
  ],
  entryComponents: [ServeurDeleteDialogComponent]
})
export class MicroservicegedServeurModule {}
