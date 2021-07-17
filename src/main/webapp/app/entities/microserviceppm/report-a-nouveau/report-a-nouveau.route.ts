import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PPM } from 'app/shared/model/microserviceppm/ppm.model';
import { ReportANouveauService } from './report-a-nouveau.service';
import { ReportANouveauComponent } from './report-a-nouveau.component';
import { IPPM } from 'app/shared/model/microserviceppm/ppm.model';

@Injectable({ providedIn: 'root' })
export class PPMResolve implements Resolve<IPPM> {
  constructor(private service: ReportANouveauService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPPM> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((pPM: HttpResponse<PPM>) => pPM.body));
    }
    return of(new PPM());
  }
}

export const reportANouveauRoute: Routes = [
  {
    path: '',
    component: ReportANouveauComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmReportANouveau.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
