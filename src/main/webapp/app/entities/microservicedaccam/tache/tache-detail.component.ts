import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITache } from 'app/shared/model/microservicedaccam/tache.model';

@Component({
  selector: 'jhi-tache-detail',
  templateUrl: './tache-detail.component.html'
})
export class TacheDetailComponent implements OnInit {
  tache: ITache;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tache }) => {
      this.tache = tache;
    });
  }

  previousState() {
    window.history.back();
  }
}
