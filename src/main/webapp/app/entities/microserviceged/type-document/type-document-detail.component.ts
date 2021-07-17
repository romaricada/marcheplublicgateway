import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeDocument } from 'app/shared/model/microserviceged/type-document.model';

@Component({
  selector: 'jhi-type-document-detail',
  templateUrl: './type-document-detail.component.html'
})
export class TypeDocumentDetailComponent implements OnInit {
  typeDocument: ITypeDocument;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument;
    });
  }

  previousState() {
    window.history.back();
  }
}
