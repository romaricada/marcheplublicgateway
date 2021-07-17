import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDecision } from 'app/shared/model/microservicedaccam/decision.model';
import { DecisionService } from './decision.service';

@Component({
  selector: 'jhi-decision-delete-dialog',
  templateUrl: './decision-delete-dialog.component.html'
})
export class DecisionDeleteDialogComponent {
  decision: IDecision;

  constructor(protected decisionService: DecisionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.decisionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'decisionListModification',
        content: 'Deleted an decision'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-decision-delete-popup',
  template: ''
})
export class DecisionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ decision }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DecisionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.decision = decision;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/decision', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/decision', { outlets: { popup: null } }]);
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
