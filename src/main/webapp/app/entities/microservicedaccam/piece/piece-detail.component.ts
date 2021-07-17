import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {IPiece} from 'app/shared/model/microservicedaccam/piece.model';

@Component({
  selector: 'jhi-piece-detail',
  templateUrl: './piece-detail.component.html'
})
export class PieceDetailComponent implements OnInit {
  piece: IPiece;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ piece }) => {
      this.piece = piece;
    });
  }

  previousState() {
    window.history.back();
  }
}
