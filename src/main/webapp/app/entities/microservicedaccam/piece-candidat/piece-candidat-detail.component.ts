import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPieceCandidat } from 'app/shared/model/microservicedaccam/piece-candidat.model';

@Component({
  selector: 'jhi-piece-candidat-detail',
  templateUrl: './piece-candidat-detail.component.html'
})
export class PieceCandidatDetailComponent implements OnInit {
  pieceCandidat: IPieceCandidat;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pieceCandidat }) => {
      this.pieceCandidat = pieceCandidat;
    });
  }

  previousState() {
    window.history.back();
  }
}
