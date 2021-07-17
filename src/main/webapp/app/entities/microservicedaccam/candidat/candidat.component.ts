import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { ICandidat } from 'app/shared/model/microservicedaccam/candidat.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CandidatService } from './candidat.service';
import {IActivite} from 'app/shared/model/microserviceppm/activite.model';

@Component({
  selector: 'jhi-candidat',
  templateUrl: './candidat.component.html'
})
export class CandidatComponent implements OnInit, OnDestroy {
  candidats: ICandidat[];
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
  activite: IActivite;


  constructor(
    protected candidatService: CandidatService,
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

  loadAll(activiteId: number) {
    this.candidatService
      .query(activiteId, {
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICandidat[]>) => {
        this.paginateCandidats(res.body, res.headers)
      });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/candidat'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll(this.getActiviteId());
  }

  getActiviteId(): number {
    if (this.activite !== null) {
      return this.activite.id;
    } else {
      return 0;
    }
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/candidat',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll(this.getActiviteId());
  }

  ngOnInit() {
    this.loadAll(this.getActiviteId());
    this.registerChangeInCandidats();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICandidat) {
    return item.id;
  }

  registerChangeInCandidats() {
    this.eventSubscriber = this.eventManager.subscribe('candidatListModification', () => this.loadAll(this.getActiviteId()));
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCandidats(data: ICandidat[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.candidats = data;
  }
}
