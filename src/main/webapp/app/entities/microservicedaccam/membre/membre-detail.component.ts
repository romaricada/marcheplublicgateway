import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMembre } from 'app/shared/model/microservicedaccam/membre.model';

@Component({
  selector: 'jhi-membre-detail',
  templateUrl: './membre-detail.component.html'
})
export class MembreDetailComponent implements OnInit {
  membre: IMembre;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ membre }) => {
      this.membre = membre;
    });
  }

  previousState() {
    window.history.back();
  }
}
