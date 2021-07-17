import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICandidat } from 'app/shared/model/microservicedaccam/candidat.model';

@Component({
  selector: 'jhi-candidat-detail',
  templateUrl: './candidat-detail.component.html'
})
export class CandidatDetailComponent implements OnInit {
  candidat: ICandidat;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ candidat }) => {
      this.candidat = candidat;
    });
  }

  previousState() {
    window.history.back();
  }
}
