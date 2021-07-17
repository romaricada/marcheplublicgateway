import { ProfilService } from 'app/admin/profil/profil.service';
import { ActivatedRouteSnapshot, Resolve, Routes } from '@angular/router';
import { IProfil, Profil } from 'app/shared/model/geteway/profil.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { ProfilComponent } from 'app/admin/profil/profil.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

@Injectable({ providedIn: 'root' })
export class ProfilResolve implements Resolve<IProfil> {
  constructor(private service: ProfilService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfil> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Profil>) => response.ok),
        map((profil: HttpResponse<Profil>) => profil.body)
      );
    }
    return of(new Profil());
  }
}

export const profilRoute: Routes = [
  {
    path: '',
    component: ProfilComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Profils'
    },
    canActivate: [UserRouteAccessService]
  }
];
