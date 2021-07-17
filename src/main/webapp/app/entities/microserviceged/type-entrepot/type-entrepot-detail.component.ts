import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeEntrepot } from 'app/shared/model/microserviceged/type-entrepot.model';

@Component({
  selector: 'jhi-type-entrepot-detail',
  templateUrl: './type-entrepot-detail.component.html'
})
export class TypeEntrepotDetailComponent implements OnInit {
  typeEntrepot: ITypeEntrepot;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeEntrepot }) => {
      this.typeEntrepot = typeEntrepot;
    });
  }

  previousState() {
    window.history.back();
  }
}
