import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiEventManager, JhiParseLinks} from 'ng-jhipster';
import {IBesoinLigneBudgetaire} from 'app/shared/model/microserviceppm/besoin-ligne-budgetaire.model';
import {ITEMS_PER_PAGE} from 'app/shared/constants/pagination.constants';
import {IUniteAdministrative} from 'app/shared/model/microserviceppm/unite-administrative.model';
import {UniteAdministrativeService} from 'app/entities/microserviceppm/unite-administrative/unite-administrative.service';
import {IExerciceBudgetaire} from 'app/shared/model/microserviceppm/exercice-budgetaire.model';
import {ExerciceBudgetaireService} from 'app/entities/microserviceppm/exercice-budgetaire/exercice-budgetaire.service';
import {BesoinLigneBudgetaireService} from 'app/entities/microserviceppm/besoin-ligne-budgetaire/besoin-ligne-budgetaire.service';

@Component({
  selector: 'jhi-besoin-activite',
  templateUrl: './besoin-activite.component.html'
})
export class BesoinActiviteComponent implements OnInit, OnDestroy {
  besoinLigneBudgetaires: IBesoinLigneBudgetaire[];
  directions: IUniteAdministrative[];
  exercices: IExerciceBudgetaire[];
  exercice: IExerciceBudgetaire;
  direction: IUniteAdministrative;
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
    protected uniteAdministrativeService: UniteAdministrativeService,
    protected exerciceBudgetaireService: ExerciceBudgetaireService,
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

  getDirectionId(): number {
    if (this.direction !== null) {
      return this.direction.id;
    } else {
      return 0;
    }
  }

  loadAll() {
    this.besoinLigneBudgetaireService
      .findAllByDirectionAndExercice(this.exercice.id,
        this.getDirectionId(), {
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
    this.router.navigate(['/besoin-activite'], {
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
      '/besoin-activite',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    // this.loadAll();
    this.exercice = null;
    this.direction = null;
    this.uniteAdministrativeService.findAll().subscribe((res: HttpResponse<IUniteAdministrative[]>) => {
      this.directions = res.body;
    });
    this.exerciceBudgetaireService.findAllWithoutPage().subscribe((res: HttpResponse<IExerciceBudgetaire[]>) => {
      this.exercices = res.body;
    });

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
    window.console.log(data);
  }

  filterByDirection() {
    this.loadAll();
  }
  actualiser() {
    this.exercice = null;
    this.loadAll();
  }

}
