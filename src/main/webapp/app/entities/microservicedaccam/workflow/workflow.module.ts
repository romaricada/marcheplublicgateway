import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { WorkflowComponent } from './workflow.component';
import { WorkflowDetailComponent } from './workflow-detail.component';
import { WorkflowUpdateComponent } from './workflow-update.component';
import { WorkflowDeletePopupComponent, WorkflowDeleteDialogComponent } from './workflow-delete-dialog.component';
import { workflowRoute, workflowPopupRoute } from './workflow.route';

const ENTITY_STATES = [...workflowRoute, ...workflowPopupRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    WorkflowComponent,
    WorkflowDetailComponent,
    WorkflowUpdateComponent,
    WorkflowDeleteDialogComponent,
    WorkflowDeletePopupComponent
  ],
  entryComponents: [WorkflowDeleteDialogComponent]
})
export class MicroservicedaccamWorkflowModule {}
