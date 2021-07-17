import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkflow } from 'app/shared/model/microservicedaccam/workflow.model';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'jhi-workflow-delete-dialog',
  templateUrl: './workflow-delete-dialog.component.html'
})
export class WorkflowDeleteDialogComponent {
  workflow: IWorkflow;

  constructor(protected workflowService: WorkflowService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.workflowService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'workflowListModification',
        content: 'Deleted an workflow'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-workflow-delete-popup',
  template: ''
})
export class WorkflowDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ workflow }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WorkflowDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.workflow = workflow;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/workflow', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/workflow', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
