import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IBesoinLigneBudgetaire } from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BesoinLigneBudgetaireService } from './besoin-ligne-budgetaire.service';

@Component({
  selector: 'jhi-besoin-ligne-budgetaire',
  templateUrl: './besoin-ligne-budgetaire.component.html'
})
export class BesoinLigneBudgetaireComponent implements OnInit, OnDestroy {
  besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
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

  constructor(
    protected besoinLigneBudgetaireService: BesoinLigneBudgetaireService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
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

  loadAll() {
    this.besoinLigneBudgetaireService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IBesoinLigneBudgetaire[]>) => this.paginateBesoinLigneBudgetaires(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/besoin-ligne-budgetaire'], {
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
      '/besoin-ligne-budgetaire',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBesoinLigneBudgetaires();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBesoinLigneBudgetaire) {
    return item.id;
  }

  registerChangeInBesoinLigneBudgetaires() {
    this.eventSubscriber = this.eventManager.subscribe('besoinLigneBudgetaireListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateBesoinLigneBudgetaires(data: IBesoinLigneBudgetaire[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.besoinLigneBudgetaires = data;
  }
}
