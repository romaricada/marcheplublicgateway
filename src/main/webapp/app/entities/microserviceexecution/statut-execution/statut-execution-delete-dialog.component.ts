import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';
import { StatutExecutionService } from './statut-execution.service';

@Component({
  selector: 'jhi-statut-execution-delete-dialog',
  templateUrl: './statut-execution-delete-dialog.component.html'
})
export class StatutExecutionDeleteDialogComponent {
  statutExecution: IStatutExecution;

  constructor(
    protected statutExecutionService: StatutExecutionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.statutExecutionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'statutExecutionListModification',
        content: 'Deleted an statutExecution'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-statut-execution-delete-popup',
  template: ''
})
export class StatutExecutionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ statutExecution }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StatutExecutionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.statutExecution = statutExecution;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/statut-execution', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/statut-execution', { outlets: { popup: null } }]);
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
