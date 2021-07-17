import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILocale } from 'app/shared/model/microserviceged/locale.model';
import { LocaleService } from './locale.service';

@Component({
  selector: 'jhi-locale-delete-dialog',
  templateUrl: './locale-delete-dialog.component.html'
})
export class LocaleDeleteDialogComponent {
  locale: ILocale;

  constructor(protected localeService: LocaleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.localeService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'localeListModification',
        content: 'Deleted an locale'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-locale-delete-popup',
  template: ''
})
export class LocaleDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ locale }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LocaleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.locale = locale;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/locale', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/locale', { outlets: { popup: null } }]);
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
