import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IPieceCandidat, PieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';
import { PieceCandidatService } from './piece-candidat.service';
import { ICandidatLot } from 'app/shared/model/microservicedaccam/candidat-lot.model';
import { CandidatLotService } from 'app/entities/microservicedaccam/candidat-lot/candidat-lot.service';

@Component({
  selector: 'jhi-piece-candidat-update',
  templateUrl: './piece-candidat-update.component.html'
})
export class PieceCandidatUpdateComponent implements OnInit {
  isSaving: boolean;

  candidatlots: ICandidatLot[];

  pieces: IPieceCandidat[];

  editForm = this.fb.group({
    id: [],
    deleted: [null, [Validators.required]],
    candidatLot: [],
    piece: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pieceCandidatService: PieceCandidatService,
    protected candidatLotService: CandidatLotService,
    protected pieceService: PieceCandidatService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pieceCandidat }) => {
      this.updateForm(pieceCandidat);
    });
    this.candidatLotService
      .query()
      .subscribe(
        (res: HttpResponse<ICandidatLot[]>) => (this.candidatlots = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.pieceService
      .query()
      .subscribe((res: HttpResponse<IPieceCandidat[]>) => (this.pieces = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pieceCandidat: IPieceCandidat) {
    this.editForm.patchValue({
      id: pieceCandidat.id,
      deleted: pieceCandidat.deleted,
      candidatLot: pieceCandidat.candidatLot,
      piece: pieceCandidat.piece
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pieceCandidat = this.createFromForm();
    if (pieceCandidat.id !== undefined) {
      this.subscribeToSaveResponse(this.pieceCandidatService.update(pieceCandidat));
    } else {
      this.subscribeToSaveResponse(this.pieceCandidatService.create(pieceCandidat));
    }
  }

  private createFromForm(): IPieceCandidat {
    return {
      ...new PieceCandidat(),
      id: this.editForm.get(['id']).value,
      deleted: this.editForm.get(['deleted']).value,
      candidatLot: this.editForm.get(['candidatLot']).value,
      piece: this.editForm.get(['piece']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPieceCandidat>>) {
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

  trackCandidatLotById(index: number, item: ICandidatLot) {
    return item.id;
  }

  trackPieceById(index: number, item: IPieceCandidat) {
    return item.id;
  }
}
