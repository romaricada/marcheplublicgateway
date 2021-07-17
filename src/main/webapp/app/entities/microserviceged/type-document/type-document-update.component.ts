import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeDocument, TypeDocument } from 'app/shared/model/microserviceged/type-document.model';
import { TypeDocumentService } from './type-document.service';

@Component({
  selector: 'jhi-type-document-update',
  templateUrl: './type-document-update.component.html'
})
export class TypeDocumentUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected typeDocumentService: TypeDocumentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.updateForm(typeDocument);
    });
  }

  updateForm(typeDocument: ITypeDocument) {
    this.editForm.patchValue({
      id: typeDocument.id,
      libelle: typeDocument.libelle,
      deleted: typeDocument.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeDocument = this.createFromForm();
    if (typeDocument.id !== undefined) {
      this.subscribeToSaveResponse(this.typeDocumentService.update(typeDocument));
    } else {
      this.subscribeToSaveResponse(this.typeDocumentService.create(typeDocument));
    }
  }

  private createFromForm(): ITypeDocument {
    return {
      ...new TypeDocument(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeDocument>>) {
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
