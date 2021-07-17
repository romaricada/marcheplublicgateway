import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ITacheWorkflow, TacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';
import { TacheWorkflowService } from './tache-workflow.service';
import { ITache } from 'app/shared/model/microservicedaccam/tache.model';
import { TacheService } from 'app/entities/microservicedaccam/tache/tache.service';
import { IWorkflow } from 'app/shared/model/microservicedaccam/workflow.model';
import { WorkflowService } from 'app/entities/microservicedaccam/workflow/workflow.service';

@Component({
  selector: 'jhi-tache-workflow-update',
  templateUrl: './tache-workflow-update.component.html'
})
export class TacheWorkflowUpdateComponent implements OnInit {
  isSaving: boolean;

  taches: ITache[];

  workflows: IWorkflow[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    tache: [],
    workflow: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tacheWorkflowService: TacheWorkflowService,
    protected tacheService: TacheService,
    protected workflowService: WorkflowService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tacheWorkflow }) => {
      this.updateForm(tacheWorkflow);
    });
    this.tacheService
      .query()
      .subscribe((res: HttpResponse<ITache[]>) => (this.taches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.workflowService
      .query()
      .subscribe((res: HttpResponse<IWorkflow[]>) => (this.workflows = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tacheWorkflow: ITacheWorkflow) {
    this.editForm.patchValue({
      id: tacheWorkflow.id,
      date: tacheWorkflow.date,
      deleted: tacheWorkflow.deleted,
      tache: tacheWorkflow.tache,
      workflow: tacheWorkflow.workflow
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tacheWorkflow = this.createFromForm();
    if (tacheWorkflow.id !== undefined) {
      this.subscribeToSaveResponse(this.tacheWorkflowService.update(tacheWorkflow));
    } else {
      this.subscribeToSaveResponse(this.tacheWorkflowService.create(tacheWorkflow));
    }
  }

  private createFromForm(): ITacheWorkflow {
    return {
      ...new TacheWorkflow(),
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value,
      deleted: this.editForm.get(['deleted']).value,
      tache: this.editForm.get(['tache']).value,
      workflow: this.editForm.get(['workflow']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITacheWorkflow>>) {
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

  trackTacheById(index: number, item: ITache) {
    return item.id;
  }

  trackWorkflowById(index: number, item: IWorkflow) {
    return item.id;
  }
}
