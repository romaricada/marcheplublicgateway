import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMembre, Membre } from 'app/shared/model/microservicedaccam/membre.model';
import { MembreService } from './membre.service';

@Component({
  selector: 'jhi-membre-update',
  templateUrl: './membre-update.component.html'
})
export class MembreUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    telephone: [],
    email: [],
    directionId: [],
    deleted: [null, [Validators.required]]
  });

  constructor(protected membreService: MembreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ membre }) => {
      this.updateForm(membre);
    });
  }

  updateForm(membre: IMembre) {
    this.editForm.patchValue({
      id: membre.id,
      nom: membre.nom,
      prenom: membre.prenom,
      telephone: membre.telephone,
      email: membre.email,
      directionId: membre.directionId,
      deleted: membre.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const membre = this.createFromForm();
    if (membre.id !== undefined) {
      this.subscribeToSaveResponse(this.membreService.update(membre));
    } else {
      this.subscribeToSaveResponse(this.membreService.create(membre));
    }
  }

  private createFromForm(): IMembre {
    return {
      ...new Membre(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      telephone: this.editForm.get(['telephone']).value,
      email: this.editForm.get(['email']).value,
      directionId: this.editForm.get(['directionId']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMembre>>) {
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
