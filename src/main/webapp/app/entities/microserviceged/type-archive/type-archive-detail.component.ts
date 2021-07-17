import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeArchive } from 'app/shared/model/microserviceged/type-archive.model';

@Component({
  selector: 'jhi-type-archive-detail',
  templateUrl: './type-archive-detail.component.html'
})
export class TypeArchiveDetailComponent implements OnInit {
  typeArchive: ITypeArchive;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ typeArchive }) => {
      this.typeArchive = typeArchive;
    });
  }

  previousState() {
    window.history.back();
  }
}
