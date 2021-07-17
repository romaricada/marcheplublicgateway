import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ILocale, Locale } from 'app/shared/model/microserviceged/locale.model';
import { LocaleService } from './locale.service';

@Component({
  selector: 'jhi-locale-update',
  templateUrl: './locale-update.component.html'
})
export class LocaleUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    adresseLocale: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected localeService: LocaleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ locale }) => {
      this.updateForm(locale);
    });
  }

  updateForm(locale: ILocale) {
    this.editForm.patchValue({
      id: locale.id,
      libelle: locale.libelle,
      adresseLocale: locale.adresseLocale,
      deleted: locale.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const locale = this.createFromForm();
    if (locale.id !== undefined) {
      this.subscribeToSaveResponse(this.localeService.update(locale));
    } else {
      this.subscribeToSaveResponse(this.localeService.create(locale));
    }
  }

  private createFromForm(): ILocale {
    return {
      ...new Locale(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      adresseLocale: this.editForm.get(['adresseLocale']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocale>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
