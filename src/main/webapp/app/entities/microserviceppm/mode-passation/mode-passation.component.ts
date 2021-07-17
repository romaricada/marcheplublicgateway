import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IModePassation, ModePassation } from 'app/shared/model/microserviceppm/mode-passation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ModePassationService } from './mode-passation.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { INaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';

@Component({
  selector: 'jhi-mode-passation',
  templateUrl: './mode-passation.component.html',
  styleUrls: ['./mode-passation.component.scss']
})
export class ModePassationComponent implements OnInit, OnDestroy {
  modePassations: IModePassation[];
  modePassationSelected: IModePassation[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  modePassation: IModePassation;
  displayAdd: boolean;
  isSaving: boolean;
  displayDelete: boolean;
  displaych: boolean;

  constructor(
    protected modePassationService: ModePassationService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.modePassationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IModePassation[]>) => this.paginateModePassations(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/mode-passation'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/mode-passation',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.isSaving = false;
    this.displayAdd = false;
    this.displaych = false;
    this.modePassation = new ModePassation();
    this.loadAll();
    this.registerChangeInModePassations();
  }
  enre() {
    this.displaych = true;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IModePassation) {
    return item.id;
  }

  registerChangeInModePassations() {
    this.eventSubscriber = this.eventManager.subscribe('modePassationListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  add(modePassation: IModePassation) {
    modePassation === null ? (this.modePassation = new ModePassation()) : (this.modePassation = modePassation);
    this.displayAdd = true;
  }

  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.modePassation.id !== undefined) {
        this.subscribeToSaveResponse(this.modePassationService.update(this.modePassation));
      } else {
        this.subscribeToSaveResponse(this.modePassationService.create(this.modePassation));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Le Mode de Passation existe déjà !');
    }
  }


  protected paginateModePassations(data: IModePassation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.modePassations = data;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INaturePrestation>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Mode de Passation ajouté avec succès!');
        this.onSaveSuccess();
      },
      () => {
        this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
        this.onSaveError();
      }
    );
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.displayAdd = false;
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  annuler() {
    this.modePassation = new ModePassation();
    this.displayAdd = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.modePassationService.deleteAll(this.modePassationSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  deleteElement(mode: IModePassation) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (mode === null) {
          return;
        } else {
          mode.deleted = true;
          this.modePassationService.update(mode).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
          );
        }
      }
    });
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  ifExist(): boolean {
    if (this.modePassation.id) {
      return this.modePassations.some(
        value => value.id !== this.modePassation.id && value.libellePassation === this.modePassation.libellePassation
      );
    } else {
      return this.modePassations.some(value => value.libellePassation === this.modePassation.libellePassation);
    }
  }
  annulerDelete() {
    this.modePassation = new ModePassation();
    this.displayDelete = false;
  }
}
