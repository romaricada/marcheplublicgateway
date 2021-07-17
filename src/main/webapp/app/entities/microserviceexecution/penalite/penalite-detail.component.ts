import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPenalite } from 'app/shared/model/microserviceexecution/penalite.model';

@Component({
  selector: 'jhi-penalite-detail',
  templateUrl: './penalite-detail.component.html'
})
export class PenaliteDetailComponent implements OnInit {
  penalite: IPenalite;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ penalite }) => {
      this.penalite = penalite;
    });
  }

  previousState() {
    window.history.back();
  }
}
