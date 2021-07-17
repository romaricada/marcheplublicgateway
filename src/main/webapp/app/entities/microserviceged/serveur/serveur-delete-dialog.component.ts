import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServeur } from 'app/shared/model/microserviceged/serveur.model';
import { ServeurService } from './serveur.service';

@Component({
  selector: 'jhi-serveur-delete-dialog',
  templateUrl: './serveur-delete-dialog.component.html'
})
export class ServeurDeleteDialogComponent {
  serveur: IServeur;

  constructor(protected serveurService: ServeurService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.serveurService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'serveurListModification',
        content: 'Deleted an serveur'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-serveur-delete-popup',
  template: ''
})
export class ServeurDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ serveur }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ServeurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.serveur = serveur;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/serveur', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/serveur', { outlets: { popup: null } }]);
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
