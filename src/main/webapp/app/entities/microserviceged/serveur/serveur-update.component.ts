import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse,} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IServeur, Serveur } from 'app/shared/model/microserviceged/serveur.model';
import { ServeurService } from './serveur.service';

@Component({
  selector: 'jhi-serveur-update',
  templateUrl: './serveur-update.component.html'
})
export class ServeurUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    adresse: [null, [Validators.required]],
    port: [null, [Validators.required]],
    nomServeur: [null, [Validators.required]],
    motPasse: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected serveurService: ServeurService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ serveur }) => {
      this.updateForm(serveur);
    });
  }

  updateForm(serveur: IServeur) {
    this.editForm.patchValue({
      id: serveur.id,
      adresse: serveur.adresse,
      port: serveur.port,
      motPasse: serveur.motPasse,
      nomServeur: serveur.nomServeur,
      deleted: serveur.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const serveur = this.createFromForm();
    if (serveur.id !== undefined) {
      this.subscribeToSaveResponse(this.serveurService.update(serveur));
    } else {
      this.subscribeToSaveResponse(this.serveurService.create(serveur));
    }
  }

  private createFromForm(): IServeur {
    return {
      ...new Serveur(),
      id: this.editForm.get(['id']).value,
      adresse: this.editForm.get(['adresse']).value,
      port: this.editForm.get(['port']).value,
      nomServeur: this.editForm.get(['nomServeur']).value,
      motPasse: this.editForm.get(['motPasse']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServeur>>) {
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
