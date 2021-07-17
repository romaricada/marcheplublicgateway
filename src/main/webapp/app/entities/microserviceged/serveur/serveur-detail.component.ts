import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServeur } from 'app/shared/model/microserviceged/serveur.model';

@Component({
  selector: 'jhi-serveur-detail',
  templateUrl: './serveur-detail.component.html'
})
export class ServeurDetailComponent implements OnInit {
  serveur: IServeur;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ serveur }) => {
      this.serveur = serveur;
    });
  }

  previousState() {
    window.history.back();
  }
}
