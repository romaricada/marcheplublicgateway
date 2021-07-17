import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import {IPiece} from 'app/shared/model/microservicedaccam/piece.model';
import {PieceService} from 'app/entities/microservicedaccam/piece/piece.service';

@Component({
  selector: 'jhi-piece-delete-dialog',
  templateUrl: './piece-delete-dialog.component.html'
})
export class PieceDeleteDialogComponent {
  piece: IPiece;

  constructor(
    protected pieceService: PieceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pieceService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'pieceListModification',
        content: 'Deleted an piece'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-piece-delete-popup',
  template: ''
})
export class PieceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ piece }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PieceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.piece = piece;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/piece', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/piece', { outlets: { popup: null } }]);
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
