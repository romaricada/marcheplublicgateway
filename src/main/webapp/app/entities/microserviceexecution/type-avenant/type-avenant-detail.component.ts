import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeAvenant } from 'app/shared/model/microserviceexecution/type-avenant.model';

@Component({
  selector: 'jhi-type-avenant-detail',
  templateUrl: './type-avenant-detail.component.html'
})
export class TypeAvenantDetailComponent implements OnInit {
  typeAvenant: ITypeAvenant;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeAvenant }) => {
      this.typeAvenant = typeAvenant;
    });
  }

  previousState() {
    window.history.back();
  }
}
