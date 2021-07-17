import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TypeArchiveComponent } from './type-archive.component';
import { TypeArchiveDetailComponent } from './type-archive-detail.component';
import { TypeArchiveUpdateComponent } from './type-archive-update.component';
import { TypeArchiveDeletePopupComponent, TypeArchiveDeleteDialogComponent } from './type-archive-delete-dialog.component';
import { typeArchiveRoute, typeArchivePopupRoute } from './type-archive.route';

const ENTITY_STATES = [...typeArchiveRoute, ...typeArchivePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeArchiveComponent,
    TypeArchiveDetailComponent,
    TypeArchiveUpdateComponent,
    TypeArchiveDeleteDialogComponent,
    TypeArchiveDeletePopupComponent
  ],
  entryComponents: [TypeArchiveDeleteDialogComponent]
})
export class MicroservicegedTypeArchiveModule {}
