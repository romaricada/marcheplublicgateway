import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeCommission } from 'app/shared/model/microservicedaccam/type-commission.model';

@Component({
  selector: 'jhi-type-commission-detail',
  templateUrl: './type-commission-detail.component.html'
})
export class TypeCommissionDetailComponent implements OnInit {
  typeCommission: ITypeCommission;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeCommission }) => {
      this.typeCommission = typeCommission;
    });
  }

  previousState() {
    window.history.back();
  }
}
