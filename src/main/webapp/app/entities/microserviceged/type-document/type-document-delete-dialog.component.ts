import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeDocument } from 'app/shared/model/microserviceged/type-document.model';
import { TypeDocumentService } from './type-document.service';

@Component({
  selector: 'jhi-type-document-delete-dialog',
  templateUrl: './type-document-delete-dialog.component.html'
})
export class TypeDocumentDeleteDialogComponent {
  typeDocument: ITypeDocument;

  constructor(
    protected typeDocumentService: TypeDocumentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeDocumentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'typeDocumentListModification',
        content: 'Deleted an typeDocument'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-document-delete-popup',
  template: ''
})
export class TypeDocumentDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeDocumentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeDocument = typeDocument;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/type-document', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/type-document', { outlets: { popup: null } }]);
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
