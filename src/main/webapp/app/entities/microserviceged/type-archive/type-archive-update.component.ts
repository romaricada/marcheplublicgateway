import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITypeArchive, TypeArchive } from 'app/shared/model/microserviceged/type-archive.model';
import { TypeArchiveService } from './type-archive.service';

@Component({
  selector: 'jhi-type-archive-update',
  templateUrl: './type-archive-update.component.html'
})
export class TypeArchiveUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected typeArchiveService: TypeArchiveService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ typeArchive }) => {
      this.updateForm(typeArchive);
    });
  }

  updateForm(typeArchive: ITypeArchive) {
    this.editForm.patchValue({
      id: typeArchive.id,
      libelle: typeArchive.libelle,
      deleted: typeArchive.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const typeArchive = this.createFromForm();
    if (typeArchive.id !== undefined) {
      this.subscribeToSaveResponse(this.typeArchiveService.update(typeArchive));
    } else {
      this.subscribeToSaveResponse(this.typeArchiveService.create(typeArchive));
    }
  }

  private createFromForm(): ITypeArchive {
    return {
      ...new TypeArchive(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeArchive>>) {
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
