import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { INaturePrestation, NaturePrestation } from 'app/shared/model/microserviceppm/nature-prestation.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { NaturePrestationService } from './nature-prestation.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-nature-prestation',
  templateUrl: './nature-prestation.component.html',
  styleUrls: ['./nature-prestation.component.scss']
})
export class NaturePrestationComponent implements OnInit, OnDestroy {
  naturePrestations: INaturePrestation[];
  naturePrestationSelected: INaturePrestation[];
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
  naturePrestation: INaturePrestation;
  displayDelete: Boolean;
  display: Boolean;
  isSaving: Boolean;

  constructor(
    protected naturePrestationService: NaturePrestationService,
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

  add(naturePrestation: INaturePrestation) {
    naturePrestation === null ? (this.naturePrestation = new NaturePrestation()) : (this.naturePrestation = naturePrestation);
    this.display = true;
  }

  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.naturePrestation.id !== undefined) {
        this.subscribeToSaveResponse(this.naturePrestationService.update(this.naturePrestation));
      } else {
        this.subscribeToSaveResponse(this.naturePrestationService.create(this.naturePrestation));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'La nature de prestation existe déjà !');
    }
  }

  annuler() {
    this.naturePrestation = new NaturePrestation();
    this.display = false;
  }
  loadAll() {
    this.naturePrestationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<INaturePrestation[]>) => this.paginateNaturePrestations(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/nature-prestation'], {
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
      '/nature-prestation',
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
    this.naturePrestation = new NaturePrestation();
    this.naturePrestationSelected = [];
    this.loadAll();
    this.registerChangeInNaturePrestations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INaturePrestation) {
    return item.id;
  }

  registerChangeInNaturePrestations() {
    this.eventSubscriber = this.eventManager.subscribe('nature PrestationList Modification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateNaturePrestations(data: INaturePrestation[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.naturePrestations = data;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<INaturePrestation>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Nature Prestation ajouté avec succès!');
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

  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.naturePrestationService.deleteAll(this.naturePrestationSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  annulerDelete() {
    this.displayDelete = false;
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
          this.naturePrestationService.update(nature).subscribe(
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
    if (this.naturePrestation.id) {
      return this.naturePrestations.some(value => value.id !== this.naturePrestation.id && value.libelle === this.naturePrestation.libelle);
    } else {
      return this.naturePrestations.some(value => value.libelle === this.naturePrestation.libelle);
    }
  }
}
