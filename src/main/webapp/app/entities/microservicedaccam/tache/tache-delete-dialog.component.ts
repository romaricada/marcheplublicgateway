import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITache } from 'app/shared/model/microservicedaccam/tache.model';
import { TacheService } from './tache.service';

@Component({
  selector: 'jhi-tache-delete-dialog',
  templateUrl: './tache-delete-dialog.component.html'
})
export class TacheDeleteDialogComponent {
  tache: ITache;

  constructor(protected tacheService: TacheService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tacheService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'tacheListModification',
        content: 'Deleted an tache'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tache-delete-popup',
  template: ''
})
export class TacheDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tache }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TacheDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tache = tache;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/tache', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/tache', { outlets: { popup: null } }]);
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
