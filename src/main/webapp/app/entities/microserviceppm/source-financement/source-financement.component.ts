import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ISourceFinancement, SourceFinancement } from 'app/shared/model/microserviceppm/source-financement.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SourceFinancementService } from './source-financement.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { INaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';
import { COUNTRIES} from "../../../../content/data/countruies";

@Component({
  selector: 'jhi-source-financement',
  templateUrl: './source-financement.component.html',
  styleUrls: ['./source-financement.component.scss']
})
export class SourceFinancementComponent implements OnInit, OnDestroy {
  sourceFinancements: ISourceFinancement[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  Countries= COUNTRIES;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  displayDelete: Boolean;
  sourceFinancement: ISourceFinancement;
  display: Boolean;
  sourceFinancementSelected: ISourceFinancement[];
  isSaving: Boolean;


  constructor(
    protected sourceFinancementService: SourceFinancementService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }


  save() {

    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.sourceFinancement.id !== undefined) {
        this.subscribeToSaveResponse(this.sourceFinancementService.update(this.sourceFinancement));
      } else {
        this.subscribeToSaveResponse(this.sourceFinancementService.create(this.sourceFinancement));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'La source de financement existe déjà !');
    }
  }


  annulerDelete() {
    this.displayDelete = false;
  }
  deleteAll() {
    this.sourceFinancementService.deleteAll(this.sourceFinancementSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );
    this.displayDelete = false;
  }

  annuler() {
    this.sourceFinancement = new SourceFinancement();
    this.display = false;
  }

  add(sourceFinancement: ISourceFinancement) {
    sourceFinancement === null ? (this.sourceFinancement = new SourceFinancement()) : (this.sourceFinancement = sourceFinancement);
    this.display = true;
  }
  supprimer() {
    this.displayDelete = true;
  }

  loadAll() {
    this.sourceFinancementService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISourceFinancement[]>) => this.paginateSourceFinancements(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/source-financement'], {
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
      '/source-financement',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.displayDelete = false;
    this.display = false;
    this.isSaving = false;
    this.sourceFinancement = new SourceFinancement();
    this.sourceFinancementSelected = [];
    this.loadAll();
    this.registerChangeInSourceFinancements();

  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISourceFinancement) {
    return item.id;
  }

  registerChangeInSourceFinancements() {
    this.eventSubscriber = this.eventManager.subscribe('sourceFinancementListModification', () => this.loadAll());
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISourceFinancement>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Source de financement ajoutée avec succès!');
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
    this.display = false;
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSourceFinancements(data: ISourceFinancement[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.sourceFinancements = data;
  }
  deleteElement(nature: INaturePrestation) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (nature === null) {
          return;
        } else {
          nature.deleted = true;
          this.sourceFinancementService.update(nature).subscribe(
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
    if (this.sourceFinancement.id) {
      return this.sourceFinancements.some(
        value =>
          value.id !== this.sourceFinancement.id &&
          value.libelle === this.sourceFinancement.libelle &&
          value.codePays === this.sourceFinancement.codePays &&
          value.code === this.sourceFinancement.code &&
          value.type === this.sourceFinancement.type
      );
    } else {
      return this.sourceFinancements.some(value => value.libelle === this.sourceFinancement.libelle);
    }
  }
}
