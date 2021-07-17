import {Routes} from '@angular/router';

import { HomeComponent } from './home.component';
import {AccueilComponent} from "app/home/accueil.component";

export const HOME_ROUTE: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authorities: [],
      pageTitle: 'Login'
    }
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: "Bienvenue sur SGIMP"
    }
  }
];
