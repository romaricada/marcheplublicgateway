import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReception } from 'app/shared/model/microservicedaccam/reception.model';
import { ReceptionService } from './reception.service';

@Component({
  selector: 'jhi-reception-delete-dialog',
  templateUrl: './reception-delete-dialog.component.html'
})
export class ReceptionDeleteDialogComponent {
  reception: IReception;

  constructor(protected receptionService: ReceptionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.receptionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'receptionListModification',
        content: 'Deleted an reception'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reception-delete-popup',
  template: ''
})
export class ReceptionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reception }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReceptionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reception = reception;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/reception', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/reception', { outlets: { popup: null } }]);
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
