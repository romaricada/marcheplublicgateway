import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';
import { TypeCommissionService } from './type-commission.service';

@Component({
  selector: 'jhi-type-commission-delete-dialog',
  templateUrl: './type-commission-delete-dialog.component.html'
})
export class TypeCommissionDeleteDialogComponent {
  typeCommission: ITypeCommission;

  constructor(
    protected typeCommissionService: TypeCommissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeCommissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'typeCommissionListModification',
        content: 'Deleted an typeCommission'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-commission-delete-popup',
  template: ''
})
export class TypeCommissionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeCommission }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeCommissionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeCommission = typeCommission;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/type-commission', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/type-commission', { outlets: { popup: null } }]);
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
