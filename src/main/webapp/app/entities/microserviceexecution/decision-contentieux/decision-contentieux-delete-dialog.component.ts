import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';
import { DecisionContentieuxService } from './decision-contentieux.service';

@Component({
  selector: 'jhi-decision-contentieux-delete-dialog',
  templateUrl: './decision-contentieux-delete-dialog.component.html'
})
export class DecisionContentieuxDeleteDialogComponent {
  decisionContentieux: IDecisionContentieux;

  constructor(
    protected decisionContentieuxService: DecisionContentieuxService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.decisionContentieuxService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'decisionContentieuxListModification',
        content: 'Deleted an decisionContentieux'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-decision-contentieux-delete-popup',
  template: ''
})
export class DecisionContentieuxDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ decisionContentieux }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DecisionContentieuxDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.decisionContentieux = decisionContentieux;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/decision-contentieux', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/decision-contentieux', { outlets: { popup: null } }]);
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
