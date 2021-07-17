import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeArchive } from 'app/shared/model/microserviceged/type-archive.model';
import { TypeArchiveService } from './type-archive.service';

@Component({
  selector: 'jhi-type-archive-delete-dialog',
  templateUrl: './type-archive-delete-dialog.component.html'
})
export class TypeArchiveDeleteDialogComponent {
  typeArchive: ITypeArchive;

  constructor(
    protected typeArchiveService: TypeArchiveService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.typeArchiveService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'typeArchiveListModification',
        content: 'Deleted an typeArchive'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-type-archive-delete-popup',
  template: ''
})
export class TypeArchiveDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeArchive }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TypeArchiveDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.typeArchive = typeArchive;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/type-archive', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/type-archive', { outlets: { popup: null } }]);
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
