import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDecisionContentieux } from 'app/shared/model/microserviceexecution/decision-contentieux.model';

@Component({
  selector: 'jhi-decision-contentieux-detail',
  templateUrl: './decision-contentieux-detail.component.html'
})
export class DecisionContentieuxDetailComponent implements OnInit {
  decisionContentieux: IDecisionContentieux;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ decisionContentieux }) => {
      this.decisionContentieux = decisionContentieux;
    });
  }

  previousState() {
    window.history.back();
  }
}
