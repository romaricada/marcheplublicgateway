import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtapeExecution } from 'app/shared/model/microserviceexecution/etape-execution.model';

@Component({
  selector: 'jhi-etape-execution-detail',
  templateUrl: './etape-execution-detail.component.html'
})
export class EtapeExecutionDetailComponent implements OnInit {
  etapeExecution: IEtapeExecution;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ etapeExecution }) => {
      this.etapeExecution = etapeExecution;
    });
  }

  previousState() {
    window.history.back();
  }
}
