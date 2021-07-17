import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {ICandidat} from 'app/shared/model/microservicedaccam/candidat.model';

import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {
  IReclamationCandidatLot,
  ReclamationCandidatLot
} from 'app/shared/model/microservicedaccam/reclamation-candidat-lot.model';
import {IReclamation, Reclamation} from 'app/shared/model/microservicedaccam/reclamation.model';
import {Depouillement, IDepouillement} from 'app/shared/model/microservicedaccam/depouillement.model';
import {ICandidatLot} from 'app/shared/model/microservicedaccam/candidat-lot.model';
import {CandidatLotService} from 'app/entities/microservicedaccam/candidat-lot/candidat-lot.service';
import {ILot} from 'app/shared/model/microservicedaccam/lot.model';

@Component({
  selector: 'jhi-reclamation-candidat-lot',
  templateUrl: './reclamation-candidat-lot.component.html'
})
export class ReclamationCandidatLotComponent implements OnInit, OnDestroy {
  candidats: ICandidat[];
  dateDp: any;
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
  reclamationCandidatLot: IReclamationCandidatLot;
  reclamation: IReclamation;
  displayAdd: boolean;
  depouillement: IDepouillement;
  candidatLots: ICandidat[];
  candidatLot: ICandidatLot;
  lot: ILot;
  lots: ILot[];
  displaySoumissionnaireModal: boolean;
  display: boolean;
  isSaving: boolean;
  exercices: any;
  activites: any;
  activite: any;
  exercice: any;


  constructor(
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected candidatLotService: CandidatLotService
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
    this.loadAll();
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
    this.loadAll();
  }

  getLotId(): number {
    if (this.lot !== null) {
      window.console.log('==============');
      window.console.log(this.lot);
      window.console.log('==============');
      return this.lot.id;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCandidats();
    this.reclamationCandidatLot = new ReclamationCandidatLot();
    this.reclamation = new Reclamation();
    this.init();

  }

  init() {
    this.lot = null;
    this.displayAdd = false;
    this.displaySoumissionnaireModal = false;
    this.depouillement = new Depouillement();
    this.depouillement.candidatLots = [];
    this.candidatLots = [];
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICandidat) {
    return item.id;
  }

  registerChangeInCandidats() {
    this.eventSubscriber = this.eventManager.subscribe('candidatListModification', () => this.loadAll());
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

  adds() {
    this.displayAdd = true;
    this.reclamationCandidatLot = new ReclamationCandidatLot();
  }

  loadAllSoumissionnaireByLot() {
    this.candidatLotService.findSoumissionnaireByLot(this.lot.id).subscribe((res: HttpResponse<ICandidatLot[]>) => {
      this.candidatLots = res.body;
      if (this.depouillement.candidatLots.length > 0) {
        this.depouillement.candidatLots.forEach(value => {
          this.candidatLots = this.candidatLots.filter(value1 => value1.id !== value.id);
        });
      }
    });
  }

  showSoumissionnaireModal() {
    this.loadAllSoumissionnaireByLot();
    this.displaySoumissionnaireModal = true;
  }

  showModal() {
    this.depouillement = new Depouillement();
    this.depouillement.candidatLots = [];
    this.displayAdd = true;
    this.isSaving = false;
  }

  activiteChange() {

  }

  filterLot() {

  }

 /* exerciciceChange() {

  }

  deleteElement(candidatLot: ICandidatLot) {

  }

  update(candidatLot: ICandidatLot) {

  }

  previousState() {

  }*/
}
