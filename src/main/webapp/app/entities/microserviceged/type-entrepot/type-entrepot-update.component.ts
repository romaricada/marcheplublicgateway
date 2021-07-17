import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeEntrepot, TypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';
import { TypeEntrepotService } from './type-entrepot.service';

@Component({
  selector: 'jhi-type-entrepot-update',
  templateUrl: './type-entrepot-update.component.html'
})
export class TypeEntrepotUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected typeEntrepotService: TypeEntrepotService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeEntrepot }) => {
      this.updateForm(typeEntrepot);
    });
  }

  updateForm(typeEntrepot: ITypeEntrepot) {
    this.editForm.patchValue({
      id: typeEntrepot.id,
      libelle: typeEntrepot.libelle,
      deleted: typeEntrepot.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeEntrepot = this.createFromForm();
    if (typeEntrepot.id !== undefined) {
      this.subscribeToSaveResponse(this.typeEntrepotService.update(typeEntrepot));
    } else {
      this.subscribeToSaveResponse(this.typeEntrepotService.create(typeEntrepot));
    }
  }

  private createFromForm(): ITypeEntrepot {
    return {
      ...new TypeEntrepot(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeEntrepot>>) {
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
