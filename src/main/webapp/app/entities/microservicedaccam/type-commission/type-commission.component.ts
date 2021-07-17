import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import {ITypeCommission, TypeCommission} from 'app/shared/model/microservicedaccam/type-commission.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TypeCommissionService } from './type-commission.service';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'jhi-type-commission',
  templateUrl: './type-commission.component.html',
  styleUrls: ['./type-commission.component.scss']
})
export class TypeCommissionComponent implements OnInit, OnDestroy {
  typeCommissions: ITypeCommission[];
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
  displayAdd: boolean;
  typeCommission: ITypeCommission;
  isSaving: boolean;
  typeSelect: ITypeCommission[];
  displaySupp: boolean;
  displaych: boolean;

  constructor(
    protected typeCommissionService: TypeCommissionService,
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
    this.typeCommissionService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITypeCommission[]>) => this.paginateTypeCommissions(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/type-commission'], {
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
      '/type-commission',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTypeCommissions();
    this.typeCommission = new TypeCommission();
    this.typeSelect = [];
    this.displaych = false;
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITypeCommission) {
    return item.id;
  }

  registerChangeInTypeCommissions() {
    this.eventSubscriber = this.eventManager.subscribe('typeCommissionListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTypeCommissions(data: ITypeCommission[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.typeCommissions = data;
  }

  addtype(typeCommission: ITypeCommission) {
    typeCommission === null ? (this.typeCommission = new TypeCommission()) : (this.typeCommission = typeCommission);
    this.displayAdd = true;
  }

  annuler() {
    this.displayAdd = false;
  }

  save() {
    this.isSaving = true;
    if (this.typeCommission.id !== undefined) {
      this.subscribeToSaveResponse(this.typeCommissionService.update(this.typeCommission));
    } else {
      this.subscribeToSaveResponse(this.typeCommissionService.create(this.typeCommission));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeCommission>>) {
    result.subscribe(() => {
      this.showMessage('success', 'ENREGISTREMENT', 'Type de commission ajouté avec succès!');
      this.onSaveSuccess()
    },
      () => {
      this.showMessage('error', 'ENREGISTREMENT', "Echec d'enregistrement!");
      this.onSaveError();
      });
  }

  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.loadAll();
    this.displayAdd = false;
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  supp() {
    this.displaySupp = true;
  }

  annulerSupp() {
    this.displaySupp = false;
  }

  deleteAll(typeSelect) {
    this.typeCommissionService
      .updateAll(typeSelect).subscribe(
        () => {
          this.loadAll();
          this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !!!');
    },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !!!')
    );
    this.displaySupp = false;
  }

  del(typeCommission) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (typeCommission === null) {
          return;
        } else {
          this.typeCommissionService.delete(typeCommission).subscribe(
            () => {
              this.loadAll();
              this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
            },
            () => this.showMessage('error', 'SUPPRESSION', 'Ce type de commission ne peut pas être supprimer !')
          );
        }
      }
    });
  }
}
