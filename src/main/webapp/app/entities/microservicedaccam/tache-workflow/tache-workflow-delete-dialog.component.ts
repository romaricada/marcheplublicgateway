import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';
import { TacheWorkflowService } from './tache-workflow.service';

@Component({
  selector: 'jhi-tache-workflow-delete-dialog',
  templateUrl: './tache-workflow-delete-dialog.component.html'
})
export class TacheWorkflowDeleteDialogComponent {
  tacheWorkflow: ITacheWorkflow;

  constructor(
    protected tacheWorkflowService: TacheWorkflowService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tacheWorkflowService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tacheWorkflowListModification',
        content: 'Deleted an tacheWorkflow'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tache-workflow-delete-popup',
  template: ''
})
export class TacheWorkflowDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tacheWorkflow }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TacheWorkflowDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tacheWorkflow = tacheWorkflow;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/tache-workflow', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/tache-workflow', { outlets: { popup: null } }]);
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
