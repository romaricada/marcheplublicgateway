import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICandidat, Candidat } from 'app/shared/model/microservicedaccam/candidat.model';
import { CandidatService } from './candidat.service';

@Component({
  selector: 'jhi-candidat-update',
  templateUrl: './candidat-update.component.html'
})
export class CandidatUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nomStructure: [null, [Validators.required]],
    adresse: [],
    email: [],
    deleted: [null, [Validators.required]]
  });

  constructor(protected candidatService: CandidatService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ candidat }) => {
      this.updateForm(candidat);
    });
  }

  updateForm(candidat: ICandidat) {
    this.editForm.patchValue({
      id: candidat.id,
      nomStructure: candidat.nomStructure,
      adresse: candidat.adresse,
      email: candidat.email,
      deleted: candidat.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const candidat = this.createFromForm();
    if (candidat.id !== undefined) {
      this.subscribeToSaveResponse(this.candidatService.update(candidat));
    } else {
      this.subscribeToSaveResponse(this.candidatService.create(candidat));
    }
  }

  private createFromForm(): ICandidat {
    return {
      ...new Candidat(),
      id: this.editForm.get(['id']).value,
      nomStructure: this.editForm.get(['nomStructure']).value,
      adresse: this.editForm.get(['adresse']).value,
      email: this.editForm.get(['email']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidat>>) {
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
