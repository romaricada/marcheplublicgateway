import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';
import { IPpmActivite } from 'app/shared/model/microserviceppm/ppm-activite.model';
import { ImportExportService } from 'app/entities/microserviceppm/import-export/import-export.service';
import { ImportExportComponent } from 'app/entities/microserviceppm/import-export/import-export.component';

@Injectable({ providedIn: 'root' })
export class PpmActiviteResolve implements Resolve<IPpmActivite> {
  constructor(private service: ImportExportService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPpmActivite> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ppmActivite: HttpResponse<PpmActivite>) => ppmActivite.body));
    }
    return of(new PpmActivite());
  }
}

export const importExportRoute: Routes = [
  {
    path: '',
    component: ImportExportComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'marchepublicgatewayApp.microserviceppmPpmActivite.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
