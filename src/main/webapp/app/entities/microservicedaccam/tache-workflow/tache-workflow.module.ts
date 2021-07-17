import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { TacheWorkflowComponent } from './tache-workflow.component';
import { TacheWorkflowDetailComponent } from './tache-workflow-detail.component';
import { TacheWorkflowUpdateComponent } from './tache-workflow-update.component';
import { TacheWorkflowDeletePopupComponent, TacheWorkflowDeleteDialogComponent } from './tache-workflow-delete-dialog.component';
import { tacheWorkflowRoute, tacheWorkflowPopupRoute } from './tache-workflow.route';

const ENTITY_STATES = [...tacheWorkflowRoute, ...tacheWorkflowPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TacheWorkflowComponent,
    TacheWorkflowDetailComponent,
    TacheWorkflowUpdateComponent,
    TacheWorkflowDeleteDialogComponent,
    TacheWorkflowDeletePopupComponent
  ],
  entryComponents: [TacheWorkflowDeleteDialogComponent]
})
export class MicroservicedaccamTacheWorkflowModule {}
