import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeCommission, TypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';
import { TypeCommissionService } from './type-commission.service';

@Component({
  selector: 'jhi-type-commission-update',
  templateUrl: './type-commission-update.component.html'
})
export class TypeCommissionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected typeCommissionService: TypeCommissionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeCommission }) => {
      this.updateForm(typeCommission);
    });
  }

  updateForm(typeCommission: ITypeCommission) {
    this.editForm.patchValue({
      id: typeCommission.id,
      libelle: typeCommission.libelle,
      deleted: typeCommission.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeCommission = this.createFromForm();
    if (typeCommission.id !== undefined) {
      this.subscribeToSaveResponse(this.typeCommissionService.update(typeCommission));
    } else {
      this.subscribeToSaveResponse(this.typeCommissionService.create(typeCommission));
    }
  }

  private createFromForm(): ITypeCommission {
    return {
      ...new TypeCommission(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeCommission>>) {
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
