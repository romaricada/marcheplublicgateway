import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';
import { TypeEntrepotService } from './type-entrepot.service';

@Component({
  selector: 'jhi-type-entrepot-delete-dialog',
  templateUrl: './type-entrepot-delete-dialog.component.html'
})
export class TypeEntrepotDeleteDialogComponent {
  typeEntrepot: ITypeEntrepot;

  constructor(
    protected typeEntrepotService: TypeEntrepotService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeEntrepotService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'typeEntrepotListModification',
        content: 'Deleted an typeEntrepot'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-entrepot-delete-popup',
  template: ''
})
export class TypeEntrepotDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeEntrepot }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeEntrepotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeEntrepot = typeEntrepot;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/type-entrepot', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/type-entrepot', { outlets: { popup: null } }]);
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
