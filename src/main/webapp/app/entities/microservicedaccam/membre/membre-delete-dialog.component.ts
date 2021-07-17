import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMembre } from 'app/shared/model/microservicedaccam/membre.model';
import { MembreService } from './membre.service';

@Component({
  selector: 'jhi-membre-delete-dialog',
  templateUrl: './membre-delete-dialog.component.html'
})
export class MembreDeleteDialogComponent {
  membre: IMembre;

  constructor(protected membreService: MembreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.membreService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'membreListModification',
        content: 'Deleted an membre'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-membre-delete-popup',
  template: ''
})
export class MembreDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ membre }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MembreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.membre = membre;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/membre', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/membre', { outlets: { popup: null } }]);
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
