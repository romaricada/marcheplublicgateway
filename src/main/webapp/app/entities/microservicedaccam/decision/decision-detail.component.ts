import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDecision } from 'app/shared/model/microservicedaccam/decision.model';

@Component({
  selector: 'jhi-decision-detail',
  templateUrl: './decision-detail.component.html'
})
export class DecisionDetailComponent implements OnInit {
  decision: IDecision;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ decision }) => {
      this.decision = decision;
    });
  }

  previousState() {
    window.history.back();
  }
}
