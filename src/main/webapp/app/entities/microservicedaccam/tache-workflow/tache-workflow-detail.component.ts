import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITacheWorkflow } from 'app/shared/model/microservicedaccam/tache-workflow.model';

@Component({
  selector: 'jhi-tache-workflow-detail',
  templateUrl: './tache-workflow-detail.component.html'
})
export class TacheWorkflowDetailComponent implements OnInit {
  tacheWorkflow: ITacheWorkflow;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tacheWorkflow }) => {
      this.tacheWorkflow = tacheWorkflow;
    });
  }

  previousState() {
    window.history.back();
  }
}
