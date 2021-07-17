import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPenalite, Penalite } from 'app/shared/model/microserviceexecution/penalite.model';
import { PenaliteService } from './penalite.service';
import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';
import { ContratService } from 'app/entities/microserviceexecution/contrat/contrat.service';

@Component({
  selector: 'jhi-penalite-update',
  templateUrl: './penalite-update.component.html'
})
export class PenaliteUpdateComponent implements OnInit {
  isSaving: boolean;

  contrats: IContrat[];

  editForm = this.fb.group({
    id: [],
    motifPenalite: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    contrat: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected penaliteService: PenaliteService,
    protected contratService: ContratService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ penalite }) => {
      this.updateForm(penalite);
    });
    this.contratService
      .query()
      .subscribe((res: HttpResponse<IContrat[]>) => (this.contrats = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(penalite: IPenalite) {
    this.editForm.patchValue({
      id: penalite.id,
      motifPenalite: penalite.motifPenalite,
      deleted: penalite.deleted,
      contrat: penalite.contrat
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const penalite = this.createFromForm();
    if (penalite.id !== undefined) {
      this.subscribeToSaveResponse(this.penaliteService.update(penalite));
    } else {
      this.subscribeToSaveResponse(this.penaliteService.create(penalite));
    }
  }

  private createFromForm(): IPenalite {
    return {
      ...new Penalite(),
      id: this.editForm.get(['id']).value,
      motifPenalite: this.editForm.get(['motifPenalite']).value,
      deleted: this.editForm.get(['deleted']).value,
      contrat: this.editForm.get(['contrat']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPenalite>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackContratById(index: number, item: IContrat) {
    return item.id;
  }
}
