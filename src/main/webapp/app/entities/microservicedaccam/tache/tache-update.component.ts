import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITache, Tache } from 'app/shared/model/microservicedaccam/tache.model';
import { TacheService } from './tache.service';

@Component({
  selector: 'jhi-tache-update',
  templateUrl: './tache-update.component.html'
})
export class TacheUpdateComponent implements OnInit {
  isSaving: boolean;
  dateCreationDp: any;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    dateCreation: [],
    deleted: [null, [Validators.required]]
  });

  constructor(protected tacheService: TacheService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tache }) => {
      this.updateForm(tache);
    });
  }

  updateForm(tache: ITache) {
    this.editForm.patchValue({
      id: tache.id,
      libelle: tache.libelle,
      dateCreation: tache.dateCreation,
      deleted: tache.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tache = this.createFromForm();
    if (tache.id !== undefined) {
      this.subscribeToSaveResponse(this.tacheService.update(tache));
    } else {
      this.subscribeToSaveResponse(this.tacheService.create(tache));
    }
  }

  private createFromForm(): ITache {
    return {
      ...new Tache(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      dateCreation: this.editForm.get(['dateCreation']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITache>>) {
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
