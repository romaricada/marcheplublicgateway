import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TypeDocumentComponent } from './type-document.component';
import { TypeDocumentDetailComponent } from './type-document-detail.component';
import { TypeDocumentUpdateComponent } from './type-document-update.component';
import { TypeDocumentDeletePopupComponent, TypeDocumentDeleteDialogComponent } from './type-document-delete-dialog.component';
import { typeDocumentRoute, typeDocumentPopupRoute } from './type-document.route';

const ENTITY_STATES = [...typeDocumentRoute, ...typeDocumentPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TypeDocumentComponent,
    TypeDocumentDetailComponent,
    TypeDocumentUpdateComponent,
    TypeDocumentDeleteDialogComponent,
    TypeDocumentDeletePopupComponent
  ],
  entryComponents: [TypeDocumentDeleteDialogComponent]
})
export class MicroservicegedTypeDocumentModule {}
