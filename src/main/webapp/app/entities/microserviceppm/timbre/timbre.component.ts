import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { ITimbre, Timbre } from 'app/shared/model/microserviceppm/timbre.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { TimbreService } from './timbre.service';
import { FormBuilder } from '@angular/forms';
import {MessageService} from "primeng/api";
import { COUNTRIES} from "../../../../content/data/countruies";

@Component({
  selector: 'jhi-timbre',
  templateUrl: './timbre.component.html',
  styleUrls: ['./timbre.component.scss']
})
export class TimbreComponent implements OnInit, OnDestroy {
  timbre: ITimbre;
  timbres: ITimbre[];
  timbreSelected: ITimbre[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  Countries= COUNTRIES;
  country: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  displayDelete: Boolean;
  editForm: any;
   variabl: string = null;
  display: Boolean;
  isSaving: Boolean;
  pays: any;
  constructor(
    protected timbreService: TimbreService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder,
    protected messageService: MessageService,
    private jhiAlertService: JhiAlertService
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  init() {
    this.country = {};
    this.pays = {};
    this.editForm = this.fb.group({
      id: [],
      code: [],
      sigle: [],
      libelle: [],
      pays: [],
      devise: [],
      logo: [],
      logoContentType: [],
      identiteMinistre: [],
      titreMinistre: [],
      country: {}
    });
  }

  annuler() {
    this.display = false;
    this.display = false;
  }

  loadAll() {
    this.timbreService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ITimbre[]>) => this.paginateTimbres(res.body, res.headers));
  }

  supprimer() {
    this.displayDelete = true;
  }

  ngOnInit() {
    this.timbreSelected = [];
    this.display = false;
    this.isSaving = false;
    this.displayDelete = false;
    this.timbre = new Timbre();
    this.init();
    this.loadAll();
    this.registerChangeInTimbres();
  }

  updateForm(timbre: ITimbre) {
    this.editForm.patchValue({
      id: timbre.id,
      code: timbre.code,
      sigle: timbre.sigle,
      libelle: timbre.libelle,
      pays: timbre.pays,
      devise: timbre.devise,
      logo: timbre.logo,
      logoContentType: timbre.logoContentType,
      identiteMinistre: timbre.identiteMinistre,
      titreMinistre: timbre.titreMinistre
    });
    this.display = true;
  }

  private createFrom(): ITimbre {
    return {
      ...new Timbre(),
      id: this.editForm.get(['id']).value,
      code: this.editForm.get(['code']).value,
      sigle: this.editForm.get(['sigle']).value,
      libelle: this.editForm.get(['libelle']).value,
      pays: this.editForm.get(['pays']).value,
      devise: this.editForm.get(['devise']).value,
      logoContentType: this.editForm.get(['logoContentType']).value,
      logo: this.editForm.get(['logo']).value,
      identiteMinistre: this.editForm.get(['identiteMinistre']).value,
      titreMinistre: this.editForm.get(['titreMinistre']).value,
      country: this.editForm.get(['country']).value
    };
  }

  save() {
    if(!this.ifExist()){
    this.isSaving = true;
    const timbre = this.createFrom();
    timbre.pays = timbre.country.name;
    window.console.log(timbre);

    if (timbre.id !== null) {
      this.subscribeToSaveResponse(this.timbreService.update(timbre));
    }
    else {

      this.subscribeToSaveResponse(this.timbreService.create(timbre));
    }
  } else {
  this.showMessage('error', 'ENREGISTREMENT', 'Un membre avec le  même libéllé existe déjà !');
}
}

  add(timbre: ITimbre) {
    timbre === null ? (this.timbre = new Timbre()) : (this.timbre = timbre);
    this.display = true;
  }
  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITimbre) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInTimbres() {
    this.eventSubscriber = this.eventManager.subscribe('timbreListModification', () => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateTimbres(data: ITimbre[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.timbres = data;
  }
  showMessage(sever: string, sum: string, det: string) {
    this.messageService.add({
      severity: sever,
      summary: sum,
      detail: det
    });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimbre>>) {
    result.subscribe(
      () => {
        this.showMessage('success', 'ENREGISTREMENT', 'Timbre ajouté avec succès!');
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

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => window.console.log('blob added'), // success
      this.onError
    );
  }
  ifExist(): boolean {
    if (this.timbre.id !== undefined) {
      return this.timbres.some(value => value.id !== this.timbre.id );
    } else {
      return this.timbres.some(value => value.id ===this.timbre.id);
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
