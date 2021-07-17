import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeAvenant, TypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';
import { TypeAvenantService } from './type-avenant.service';

@Component({
  selector: 'jhi-type-avenant-update',
  templateUrl: './type-avenant-update.component.html'
})
export class TypeAvenantUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected typeAvenantService: TypeAvenantService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeAvenant }) => {
      this.updateForm(typeAvenant);
    });
  }

  updateForm(typeAvenant: ITypeAvenant) {
    this.editForm.patchValue({
      id: typeAvenant.id,
      libelle: typeAvenant.libelle,
      deleted: typeAvenant.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeAvenant = this.createFromForm();
    if (typeAvenant.id !== undefined) {
      this.subscribeToSaveResponse(this.typeAvenantService.update(typeAvenant));
    } else {
      this.subscribeToSaveResponse(this.typeAvenantService.create(typeAvenant));
    }
  }

  private createFromForm(): ITypeAvenant {
    return {
      ...new TypeAvenant(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeAvenant>>) {
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
