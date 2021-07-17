import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';
import { PieceCandidatService } from './piece-candidat.service';

@Component({
  selector: 'jhi-piece-candidat-delete-dialog',
  templateUrl: './piece-candidat-delete-dialog.component.html'
})
export class PieceCandidatDeleteDialogComponent {
  pieceCandidat: IPieceCandidat;

  constructor(
    protected pieceCandidatService: PieceCandidatService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pieceCandidatService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'pieceCandidatListModification',
        content: 'Deleted an pieceCandidat'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-piece-candidat-delete-popup',
  template: ''
})
export class PieceCandidatDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pieceCandidat }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PieceCandidatDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pieceCandidat = pieceCandidat;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/piece-candidat', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/piece-candidat', { outlets: { popup: null } }]);
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
