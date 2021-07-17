import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';
import { TypeAvenantService } from './type-avenant.service';

@Component({
  selector: 'jhi-type-avenant-delete-dialog',
  templateUrl: './type-avenant-delete-dialog.component.html'
})
export class TypeAvenantDeleteDialogComponent {
  typeAvenant: ITypeAvenant;

  constructor(
    protected typeAvenantService: TypeAvenantService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeAvenantService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'typeAvenantListModification',
        content: 'Deleted an typeAvenant'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-avenant-delete-popup',
  template: ''
})
export class TypeAvenantDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeAvenant }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeAvenantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeAvenant = typeAvenant;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/type-avenant', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/type-avenant', { outlets: { popup: null } }]);
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
