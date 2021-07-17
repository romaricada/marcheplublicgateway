import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IEtapeExecution, EtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';
import { EtapeExecutionService } from './etape-execution.service';
import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';
import { ContratService } from 'app/entities/microserviceexecution/contrat/contrat.service';

@Component({
  selector: 'jhi-etape-execution-update',
  templateUrl: './etape-execution-update.component.html'
})
export class EtapeExecutionUpdateComponent implements OnInit {
  isSaving: boolean;

  contrats: IContrat[];

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    contrat: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected etapeExecutionService: EtapeExecutionService,
    protected contratService: ContratService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ etapeExecution }) => {
      this.updateForm(etapeExecution);
    });
    this.contratService
      .query()
      .subscribe((res: HttpResponse<IContrat[]>) => (this.contrats = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(etapeExecution: IEtapeExecution) {
    this.editForm.patchValue({
      id: etapeExecution.id,
      libelle: etapeExecution.libelle,
      deleted: etapeExecution.deleted,
      contrat: etapeExecution.contrat
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const etapeExecution = this.createFromForm();
    if (etapeExecution.id !== undefined) {
      this.subscribeToSaveResponse(this.etapeExecutionService.update(etapeExecution));
    } else {
      this.subscribeToSaveResponse(this.etapeExecutionService.create(etapeExecution));
    }
  }

  private createFromForm(): IEtapeExecution {
    return {
      ...new EtapeExecution(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value,
      contrat: this.editForm.get(['contrat']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtapeExecution>>) {
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
