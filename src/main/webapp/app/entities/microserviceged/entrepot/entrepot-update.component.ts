import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IEntrepot, Entrepot } from 'app/shared/model/microserviceged/entrepot.model';
import { EntrepotService } from './entrepot.service';
import { ILocale } from 'app/shared/model/microserviceged/locale.model';
import { LocaleService } from 'app/entities/microserviceged/locale/locale.service';
import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';
import { TypeEntrepotService } from 'app/entities/microserviceged/type-entrepot/type-entrepot.service';

@Component({
  selector: 'jhi-entrepot-update',
  templateUrl: './entrepot-update.component.html'
})
export class EntrepotUpdateComponent implements OnInit {
  isSaving: boolean;

  entrepots: IEntrepot[];

  locales: ILocale[];

  typeentrepots: ITypeEntrepot[];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    entrepot: [],
    local: [],
    typeEntrepot: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected entrepotService: EntrepotService,
    protected localeService: LocaleService,
    protected typeEntrepotService: TypeEntrepotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ entrepot }) => {
      this.updateForm(entrepot);
    });
    this.entrepotService
      .query()
      .subscribe((res: HttpResponse<IEntrepot[]>) => (this.entrepots = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.localeService
      .query()
      .subscribe((res: HttpResponse<ILocale[]>) => (this.locales = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.typeEntrepotService
      .query()
      .subscribe(
        (res: HttpResponse<ITypeEntrepot[]>) => (this.typeentrepots = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(entrepot: IEntrepot) {
    this.editForm.patchValue({
      id: entrepot.id,
      libelle: entrepot.libelle,
      deleted: entrepot.deleted,
      entrepot: entrepot.entrepot,
      local: entrepot.local,
      typeEntrepot: entrepot.typeEntrepot
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const entrepot = this.createFromForm();
    if (entrepot.id !== undefined) {
      this.subscribeToSaveResponse(this.entrepotService.update(entrepot));
    } else {
      this.subscribeToSaveResponse(this.entrepotService.create(entrepot));
    }
  }

  private createFromForm(): IEntrepot {
    return {
      ...new Entrepot(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value,
      entrepot: this.editForm.get(['entrepot']).value,
      local: this.editForm.get(['local']).value,
      typeEntrepot: this.editForm.get(['typeEntrepot']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEntrepot>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEntrepotById(index: number, item: IEntrepot) {
    return item.id;
  }

  trackLocaleById(index: number, item: ILocale) {
    return item.id;
  }

  trackTypeEntrepotById(index: number, item: ITypeEntrepot) {
    return item.id;
  }
}
