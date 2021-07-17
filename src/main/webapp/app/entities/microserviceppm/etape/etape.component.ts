import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Etape, IEtape } from 'app/shared/model/microserviceppm/etape.model';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EtapeService } from './etape.service';
import { Acteur } from 'app/shared/model/microserviceppm/acteur.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import {IModePassation, ModePassation} from "app/shared/model/microserviceppm/mode-passation.model";
import {ModePassationService} from "app/entities/microserviceppm/mode-passation/mode-passation.service";

@Component({
  selector: 'jhi-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.scss']
})
export class EtapeComponent implements OnInit, OnDestroy {
  etapes: IEtape[];
  etapeSelected: IEtape[];
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
  display: Boolean;
  isSaving: Boolean;
  etape: IEtape;
  displayDelete: Boolean;
  displaych: Boolean;
  modepassation:IModePassation;
  modepassations: IModePassation[];

  constructor(
    protected etapeService: EtapeService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected messageService: MessageService,
    protected  modePrestationService:ModePassationService,
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
    this.modepassations=[];
    this.modepassation= new ModePassation();
    this.etapeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IEtape[]>) => this.paginateEtapes(res.body, res.headers));
    this.modePrestationService
      .query()
      .subscribe(
        (res: HttpResponse<IModePassation[]>) => (this.modepassations = res.body),
        () => this.onSaveError()
      );

  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }
  transition() {
    this.router.navigate(['/etape'], {
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
      '/etape',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.display = false;
    this.etape = new Etape();
    this.isSaving = false;
    this.displaych = false;
    this.loadAll();
    this.registerChangeInEtapes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEtape) {
    return item.id;
  }

  registerChangeInEtapes() {
    this.eventSubscriber = this.eventManager.subscribe('etapeListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  add(etape: IEtape) {
    etape === null ? (this.etape = new Acteur()) : (this.etape = etape);
    this.display = true;
  }

  save() {
    if (!this.ifExist()) {
      this.isSaving = true;
      this.etape.modePassationId = this.modepassation.id ;
      this.etape.modePassationLibelle= this.modepassation.libellePassation;
      window.console.log('*****    *****    *****    *****    *****    *****    *******'
        +this.etape.modePassationId+ "lau"+this.etape.modePassationLibelle);
      window.console.log(this.etape);
      if (this.etape.id !== undefined) {
        this.subscribeToSaveResponse(this.etapeService.update(this.etape));
      } else {
        this.subscribeToSaveResponse(this.etapeService.create(this.etape));
      }
    } else {
      this.showMessage('error', 'ENREGISTREMENT', 'Une etape avec le  même libéllé existe déjà !');
    }
  }

  protected paginateEtapes(data: IEtape[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.etapes = data;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtape>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Une étape ajouté avec succès!');
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
    this.etape = new Etape();
    this.display = false;
  }
  supprimer() {
    this.displayDelete = true;
  }
  deleteAll() {
    this.etapeService.deleteAll(this.etapeSelected).subscribe(
      () => {
        this.loadAll();
        this.showMessage('success', 'SUPPRESSION', 'Suppression effectuée avec succès !');
      },
      () => this.showMessage('error', 'SUPPRESSION', 'Echec de la suppression !')
    );

    this.displayDelete = false;
  }
  annulerDelete() {
    this.etape = new Etape();
    this.displayDelete = false;
  }

  deleteElement(etape: IEtape) {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Etes-vous sûr de vouloir supprimer ?',
      accept: () => {
        if (etape === null) {
          return;
        } else {
          etape.deleted = true;
          this.etapeService.update(etape).subscribe(
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

  ifExist(): boolean {
    if (this.etape.id!== undefined) {
      return this.etapes.some(value => value.id !== this.etape.id && value.libelle === this.etape.libelle);
    } else {
      return this.etapes.some(value => value.libelle === this.etape.libelle);
    }
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
}
