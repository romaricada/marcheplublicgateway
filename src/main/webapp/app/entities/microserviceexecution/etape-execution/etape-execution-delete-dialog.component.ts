import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';
import { EtapeExecutionService } from './etape-execution.service';

@Component({
  selector: 'jhi-etape-execution-delete-dialog',
  templateUrl: './etape-execution-delete-dialog.component.html'
})
export class EtapeExecutionDeleteDialogComponent {
  etapeExecution: IEtapeExecution;

  constructor(
    protected etapeExecutionService: EtapeExecutionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.etapeExecutionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'etapeExecutionListModification',
        content: 'Deleted an etapeExecution'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-etape-execution-delete-popup',
  template: ''
})
export class EtapeExecutionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ etapeExecution }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EtapeExecutionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.etapeExecution = etapeExecution;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/etape-execution', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/etape-execution', { outlets: { popup: null } }]);
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
