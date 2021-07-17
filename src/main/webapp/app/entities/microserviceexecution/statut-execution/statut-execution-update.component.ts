import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IStatutExecution, StatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';
import { StatutExecutionService } from './statut-execution.service';
import { IContrat } from 'app/shared/model/microserviceexecution/contrat.model';
import { ContratService } from 'app/entities/microserviceexecution/contrat/contrat.service';

@Component({
  selector: 'jhi-statut-execution-update',
  templateUrl: './statut-execution-update.component.html'
})
export class StatutExecutionUpdateComponent implements OnInit {
  isSaving: boolean;

  contrats: IContrat[];
  dateSuspenduDp: any;
  dateRepriseDp: any;

  editForm = this.fb.group({
    id: [],
    motif: [null, [Validators.required]],
    suspendu: [null, [Validators.required]],
    reprise: [null, [Validators.required]],
    dateSuspendu: [null, [Validators.required]],
    dateReprise: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    contrat: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected statutExecutionService: StatutExecutionService,
    protected contratService: ContratService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ statutExecution }) => {
      this.updateForm(statutExecution);
    });
    this.contratService
      .query()
      .subscribe((res: HttpResponse<IContrat[]>) => (this.contrats = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(statutExecution: IStatutExecution) {
    this.editForm.patchValue({
      id: statutExecution.id,
      motif: statutExecution.motif,
      suspendu: statutExecution.suspendu,
      reprise: statutExecution.reprise,
      dateSuspendu: statutExecution.dateSuspendu,
      dateReprise: statutExecution.dateReprise,
      deleted: statutExecution.deleted,
      contrat: statutExecution.contrat
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const statutExecution = this.createFromForm();
    if (statutExecution.id !== undefined) {
      this.subscribeToSaveResponse(this.statutExecutionService.update(statutExecution));
    } else {
      this.subscribeToSaveResponse(this.statutExecutionService.create(statutExecution));
    }
  }

  private createFromForm(): IStatutExecution {
    return {
      ...new StatutExecution(),
      id: this.editForm.get(['id']).value,
      motif: this.editForm.get(['motif']).value,
      suspendu: this.editForm.get(['suspendu']).value,
      reprise: this.editForm.get(['reprise']).value,
      dateSuspendu: this.editForm.get(['dateSuspendu']).value,
      dateReprise: this.editForm.get(['dateReprise']).value,
      deleted: this.editForm.get(['deleted']).value,
      contrat: this.editForm.get(['contrat']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatutExecution>>) {
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
