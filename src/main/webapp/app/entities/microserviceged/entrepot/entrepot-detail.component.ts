import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEntrepot } from 'app/shared/model/microserviceged/entrepot.model';

@Component({
  selector: 'jhi-entrepot-detail',
  templateUrl: './entrepot-detail.component.html'
})
export class EntrepotDetailComponent implements OnInit {
  entrepot: IEntrepot;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entrepot }) => {
      this.entrepot = entrepot;
    });
  }

  previousState() {
    window.history.back();
  }
}
