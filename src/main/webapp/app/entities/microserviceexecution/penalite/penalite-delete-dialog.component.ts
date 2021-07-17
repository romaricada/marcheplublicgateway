import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {IPenalite} from 'app/shared/model/microserviceexecution/penalite.model';
import {PenaliteService} from './penalite.service';

@Component({
    selector: 'jhi-penalite-delete-dialog',
    templateUrl: './penalite-delete-dialog.component.html'
})
export class PenaliteDeleteDialogComponent {
    penalite: IPenalite;

    constructor(protected penaliteService: PenaliteService,
                public activeModal: NgbActiveModal,
                protected eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.penaliteService.delete(id).subscribe(() => {
            this.eventManager.broadcast({
                name: 'penaliteListModification',
                content: 'Deleted an penalite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-penalite-delete-popup',
    template: ''
})
export class PenaliteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({penalite}) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PenaliteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.penalite = penalite;
                this.ngbModalRef.result.then(
                    () => {
                        this.router.navigate(['/penalite', {outlets: {popup: null}}]);
                        this.ngbModalRef = null;
                    },
                    () => {
                        this.router.navigate(['/penalite', {outlets: {popup: null}}]);
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
