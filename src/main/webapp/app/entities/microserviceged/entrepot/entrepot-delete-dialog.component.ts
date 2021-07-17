import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';
import { EntrepotService } from './entrepot.service';

@Component({
  selector: 'jhi-entrepot-delete-dialog',
  templateUrl: './entrepot-delete-dialog.component.html'
})
export class EntrepotDeleteDialogComponent {
  entrepot: IEntrepot;

  constructor(protected entrepotService: EntrepotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.entrepotService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'entrepotListModification',
        content: 'Deleted an entrepot'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-entrepot-delete-popup',
  template: ''
})
export class EntrepotDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entrepot }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EntrepotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.entrepot = entrepot;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/entrepot', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/entrepot', { outlets: { popup: null } }]);
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
