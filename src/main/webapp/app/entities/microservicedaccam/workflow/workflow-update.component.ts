import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IWorkflow, Workflow } from 'app/shared/model/microservicedaccam/workflow.model';
import { WorkflowService } from './workflow.service';

@Component({
  selector: 'jhi-workflow-update',
  templateUrl: './workflow-update.component.html'
})
export class WorkflowUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(protected workflowService: WorkflowService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ workflow }) => {
      this.updateForm(workflow);
    });
  }

  updateForm(workflow: IWorkflow) {
    this.editForm.patchValue({
      id: workflow.id,
      libelle: workflow.libelle,
      deleted: workflow.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const workflow = this.createFromForm();
    if (workflow.id !== undefined) {
      this.subscribeToSaveResponse(this.workflowService.update(workflow));
    } else {
      this.subscribeToSaveResponse(this.workflowService.create(workflow));
    }
  }

  private createFromForm(): IWorkflow {
    return {
      ...new Workflow(),
      id: this.editForm.get(['id']).value,
      libelle: this.editForm.get(['libelle']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWorkflow>>) {
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
