import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from './profile.service';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    <div class="ribbon">
      <a href="">{{ texte }}</a>
    </div>
  `,
  styleUrls: ['page-ribbon.scss']
})
export class PageRibbonComponent implements OnInit {
  ribbonEnv$: Observable<string>;
  texte = 'MENAPLN';

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));
  }
}
