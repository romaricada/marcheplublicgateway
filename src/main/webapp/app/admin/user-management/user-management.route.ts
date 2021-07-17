import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { UserService } from 'app/core/user/user.service';
import { UserManagementComponent } from './user-management.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { Account } from 'app/core/user/account.model';

@Injectable({ providedIn: 'root' })
export class UserManagementResolve implements Resolve<any> {
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['login'] ? route.params['login'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new Account();
  }
}

export const userManagementRoute: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'userManagement.home.title',
      defaultSort: 'id,asc'
    }
  },
  {
    path: 'new',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve
    }
  },
  {
    path: ':login/edit',
    component: UserManagementUpdateComponent,
    resolve: {
      user: UserManagementResolve
    }
  }
];
