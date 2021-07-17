import { Component, OnInit } from '@angular/core';
import { HttpResponse} from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDecisionContentieux, DecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';
import { DecisionContentieuxService } from './decision-contentieux.service';

@Component({
  selector: 'jhi-decision-contentieux-update',
  templateUrl: './decision-contentieux-update.component.html'
})
export class DecisionContentieuxUpdateComponent implements OnInit {
  isSaving: boolean;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    decision: [null, [Validators.required]],
    date: [null, [Validators.required]],
    structure: [null, [Validators.required]],
    referenceDecision: [null, [Validators.required]],
    deleted: [null, [Validators.required]]
  });

  constructor(
    protected decisionContentieuxService: DecisionContentieuxService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ decisionContentieux }) => {
      this.updateForm(decisionContentieux);
    });
  }

  updateForm(decisionContentieux: IDecisionContentieux) {
    this.editForm.patchValue({
      id: decisionContentieux.id,
      decision: decisionContentieux.decision,
      date: decisionContentieux.date,
      structure: decisionContentieux.structure,
      referenceDecision: decisionContentieux.referenceDecision,
      deleted: decisionContentieux.deleted
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const decisionContentieux = this.createFromForm();
    if (decisionContentieux.id !== undefined) {
      this.subscribeToSaveResponse(this.decisionContentieuxService.update(decisionContentieux));
    } else {
      this.subscribeToSaveResponse(this.decisionContentieuxService.create(decisionContentieux));
    }
  }

  private createFromForm(): IDecisionContentieux {
    return {
      ...new DecisionContentieux(),
      id: this.editForm.get(['id']).value,
      decision: this.editForm.get(['decision']).value,
      date: this.editForm.get(['date']).value,
      structure: this.editForm.get(['structure']).value,
      referenceDecision: this.editForm.get(['referenceDecision']).value,
      deleted: this.editForm.get(['deleted']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDecisionContentieux>>) {
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
