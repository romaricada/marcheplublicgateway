import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { LocaleComponent } from './locale.component';
import { LocaleDetailComponent } from './locale-detail.component';
import { LocaleUpdateComponent } from './locale-update.component';
import { LocaleDeletePopupComponent, LocaleDeleteDialogComponent } from './locale-delete-dialog.component';
import { localeRoute, localePopupRoute } from './locale.route';

const ENTITY_STATES = [...localeRoute, ...localePopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LocaleComponent, LocaleDetailComponent, LocaleUpdateComponent, LocaleDeleteDialogComponent, LocaleDeletePopupComponent],
  entryComponents: [LocaleDeleteDialogComponent]
})
export class MicroservicegedLocaleModule {}
