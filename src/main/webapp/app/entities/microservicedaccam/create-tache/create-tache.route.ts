import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Routes} from "@angular/router";
import {CreateTacheComponent} from "app/entities/microservicedaccam/create-tache/create-tache.component";

@Injectable({ providedIn: 'root' })
export class CreateTacheResolve implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): any {
    const id1 = route.queryParams.id1;
    const id2 = route.queryParams.id2;
    const id3 = route.queryParams.id3;
    return { id1, id2, id3};
  }
}

export const createTacheRoute: Routes = [
  {
    path: '',
    component: CreateTacheComponent,
    resolve: {
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Créer tache'
    }
  },
  {
    path: ':id1/:id2/:id3',
    component: CreateTacheComponent,
    resolve: {
      ids: CreateTacheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Modifier Tache'
    }
  }
];
