import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { IUniteAdministrative, UniteAdministrative } from 'app/shared/model/microserviceppm/unite-administrative.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { UniteAdministrativeService } from './unite-administrative.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'jhi-unite-administrative',
  templateUrl: './unite-administrative.component.html',
  styleUrls: ['./unite-administrative.component.scss']
})
export class UniteAdministrativeComponent implements OnInit, OnDestroy {
  uniteAdministratives: IUniteAdministrative[];
  uniteAdministrativeSelected: IUniteAdministrative[];
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
  uniteadministrative: IUniteAdministrative;
  display: Boolean;
  isSaving: Boolean;
  displayDelete: Boolean;
  displaych: Boolean;
  fonctionnalite: string;
  blockSpecial = /^[^<>*!%£=+!/$£#@azertyuiopqsdfghjklmwxcvbn,;:]+$/;


  constructor(
    protected uniteAdministrativeService: UniteAdministrativeService,
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
    this.uniteAdministrativeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IUniteAdministrative[]>) => this.paginateUniteAdministratives(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/unite-administrative'], {
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
      '/unite-administrative',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }
  enre() {
    this.displaych = true;
  }

  ngOnInit() {
    this.fonctionnalite = 'gestion des unités administratives'.toUpperCase();
    this.isSaving = false;
    this.display = false;
    this.displaych = false;
    this.uniteadministrative = new UniteAdministrative();
    this.uniteAdministratives = [];
    this.loadAll();
    this.registerChangeInUniteAdministratives();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUniteAdministrative) {
    return item.id;
  }

  registerChangeInUniteAdministratives() {
    this.eventSubscriber = this.eventManager.subscribe('uniteAdministrativeListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  add(unite: IUniteAdministrative) {
    unite === null ? (this.uniteadministrative = new UniteAdministrative()) : (this.uniteadministrative = unite);
    this.display = true;
  }
  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      if (this.uniteadministrative.id !== undefined) {
        this.subscribeToSaveResponse(this.uniteAdministrativeService.update(this.uniteadministrative));
      } else {
        this.subscribeToSaveResponse(this.uniteAdministrativeService.create(this.uniteadministrative));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Une unité administrative portant le même nom existe déjà !');
    }
  }

  protected paginateUniteAdministratives(data: IUniteAdministrative[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.uniteAdministratives = data;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUniteAdministrative>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Unité Administrative ajoutée avec succès!');
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

  annuler() {
    this.uniteadministrative = new UniteAdministrative();
    this.display = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.uniteAdministrativeService.deleteAll(this.uniteAdministrativeSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  deleteElement(unite: IUniteAdministrative) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (unite === null) {
          return;
        } else {
          unite.deleted = true;
          this.uniteAdministrativeService.update(unite).subscribe(
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
  annulerDelete() {
    this.uniteadministrative = new UniteAdministrative();
    this.displayDelete = false;
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  ifExist(): boolean {
    if (this.uniteadministrative.id) {
      return this.uniteAdministratives.some(
        value =>
          value.id !== this.uniteadministrative.id &&
          value.libelle === this.uniteadministrative.libelle &&
          value.abbreviation === this.uniteadministrative.abbreviation &&
          value.adresse === this.uniteadministrative.adresse &&
          value.contact === this.uniteadministrative.contact &&
          value.identiteResponsable === this.uniteadministrative.identiteResponsable
      );
    } else {
      return this.uniteAdministratives.some(value => value.libelle === this.uniteadministrative.libelle);
    }
  }
}
