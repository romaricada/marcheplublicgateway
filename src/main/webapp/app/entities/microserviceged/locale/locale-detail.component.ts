import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILocale } from 'app/shared/model/microserviceged/locale.model';

@Component({
  selector: 'jhi-locale-detail',
  templateUrl: './locale-detail.component.html'
})
export class LocaleDetailComponent implements OnInit {
  locale: ILocale;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ locale }) => {
      this.locale = locale;
    });
  }

  previousState() {
    window.history.back();
  }
}
