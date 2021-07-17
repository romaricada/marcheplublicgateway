import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatutExecution } from 'app/shared/model/microserviceexecution/statut-execution.model';

@Component({
  selector: 'jhi-statut-execution-detail',
  templateUrl: './statut-execution-detail.component.html'
})
export class StatutExecutionDetailComponent implements OnInit {
  statutExecution: IStatutExecution;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ statutExecution }) => {
      this.statutExecution = statutExecution;
    });
  }

  previousState() {
    window.history.back();
  }
}
