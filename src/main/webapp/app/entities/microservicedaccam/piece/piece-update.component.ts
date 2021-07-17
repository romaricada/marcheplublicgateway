import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ICandidatLot } from 'app/shared/model/microservicedaccam/candidat-lot.model';
import { CandidatLotService } from 'app/entities/microservicedaccam/candidat-lot/candidat-lot.service';
import {IPiece, Piece} from 'app/shared/model/microservicedaccam/piece.model';
import {PieceService} from 'app/entities/microservicedaccam/piece/piece.service';

@Component({
  selector: 'jhi-piece-update',
  templateUrl: './piece-update.component.html'
})
export class PieceUpdateComponent implements OnInit {
  isSaving: boolean;

  candidatlots: ICandidatLot[];

  pieces: IPiece[];

  editForm = this.fb.group({
    id: [],
    deleted: [null, [Validators.required]],
    nomPiece: [null, [Validators.required]],
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected candidatLotService: CandidatLotService,
    protected pieceService: PieceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ piece }) => {
      this.updateForm(piece);
    });
    this.candidatLotService
      .query()
      .subscribe(
        (res: HttpResponse<ICandidatLot[]>) => (this.candidatlots = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.pieceService
      .query()
      .subscribe((res: HttpResponse<IPiece[]>) => (this.pieces = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(piece: IPiece) {
    this.editForm.patchValue({
      id: piece.id,
      deleted: piece.deleted,
      nomPiece: piece.nomPiece
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const piece = this.createFromForm();
    if (piece.id !== undefined) {
      this.subscribeToSaveResponse(this.pieceService.update(piece));
    } else {
      this.subscribeToSaveResponse(this.pieceService.create(piece));
    }
  }

  private createFromForm(): IPiece {
    return {
      ...new Piece(),
      id: this.editForm.get(['id']).value,
      deleted: this.editForm.get(['deleted']).value,
      nomPiece: this.editForm.get(['nomPiece']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPiece>>) {
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

  trackPieceById(index: number, item: IPiece) {
    return item.id;
  }
}
