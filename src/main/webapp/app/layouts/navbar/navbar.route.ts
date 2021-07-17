import { Route } from '@angular/router';

import { NavbarComponent } from './navbar.component';

export const navbarRoute: Route = {
  path: '',
  component: NavbarComponent,
  data: {
    authorities: ['ROLE_USER']
  },
  outlet: 'navbar'
};
