import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IReception, Reception } from 'app/shared/model/microservicedaccam/reception.model';
import { ReceptionService } from './reception.service';

@Component({
  selector: 'jhi-reception-update',
  templateUrl: './reception-update.component.html'
})
export class ReceptionUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    telephone: [],
    email: [],
    date: [null, [Validators.required]],
    heure: [null, [Validators.required]],
    lieu: [null, [Validators.required]],
    activiteId: [],
    retirer: [],
    deleted: [null, [Validators.required]]
  });

  constructor(protected receptionService: ReceptionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reception }) => {
      this.updateForm(reception);
    });
  }

  updateForm(reception: IReception) {
    this.editForm.patchValue({
      id: reception.id,
      nom: reception.nom,
      prenom: reception.prenom,
      telephone: reception.telephone,
      email: reception.email,
      date: reception.date,
      heure: reception.heure,
      lieu: reception.lieu,
      activiteId: reception.activiteId,
      retirer: reception.retirer,
      deleted: reception.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reception = this.createFromForm();
    if (reception.id !== undefined) {
      this.subscribeToSaveResponse(this.receptionService.update(reception));
    } else {
      this.subscribeToSaveResponse(this.receptionService.create(reception));
    }
  }

  private createFromForm(): IReception {
    return {
      ...new Reception(),
      id: this.editForm.get(['id']).value,
      nom: this.editForm.get(['nom']).value,
      prenom: this.editForm.get(['prenom']).value,
      telephone: this.editForm.get(['telephone']).value,
      email: this.editForm.get(['email']).value,
      date: this.editForm.get(['date']).value,
      heure: this.editForm.get(['heure']).value,
      lieu: this.editForm.get(['lieu']).value,
      activiteId: this.editForm.get(['activiteId']).value,
      retirer: this.editForm.get(['retirer']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReception>>) {
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
