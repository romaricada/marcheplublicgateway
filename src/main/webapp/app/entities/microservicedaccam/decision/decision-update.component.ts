import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IDecision, Decision } from 'app/shared/model/microservicedaccam/decision.model';
import { DecisionService } from './decision.service';
import { IReclamation } from 'app/shared/model/microservicedaccam/reclamation.model';
import { ReclamationService } from 'app/entities/microservicedaccam/reclamation/reclamation.service';

@Component({
  selector: 'jhi-decision-update',
  templateUrl: './decision-update.component.html'
})
export class DecisionUpdateComponent implements OnInit {
  isSaving: boolean;

  reclamations: IReclamation[];

  editForm = this.fb.group({
    id: [],
    structure: [null, [Validators.required]],
    decision: [null, [Validators.required]],
    deleted: [null, [Validators.required]],
    reclamation: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected decisionService: DecisionService,
    protected reclamationService: ReclamationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ decision }) => {
      this.updateForm(decision);
    });
    this.reclamationService
      .query()
      .subscribe(
        (res: HttpResponse<IReclamation[]>) => (this.reclamations = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(decision: IDecision) {
    this.editForm.patchValue({
      id: decision.id,
      structure: decision.structure,
      decision: decision.decision,
      deleted: decision.deleted,
      reclamation: decision.reclamation
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const decision = this.createFromForm();
    if (decision.id !== undefined) {
      this.subscribeToSaveResponse(this.decisionService.update(decision));
    } else {
      this.subscribeToSaveResponse(this.decisionService.create(decision));
    }
  }

  private createFromForm(): IDecision {
    return {
      ...new Decision(),
      id: this.editForm.get(['id']).value,
      structure: this.editForm.get(['structure']).value,
      decision: this.editForm.get(['decision']).value,
      deleted: this.editForm.get(['deleted']).value,
      reclamation: this.editForm.get(['reclamation']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDecision>>) {
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

  trackReclamationById(index: number, item: IReclamation) {
    return item.id;
  }
}
