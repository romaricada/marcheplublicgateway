import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { UserManagementComponent } from './user-management.component';
import { UserManagementUpdateComponent } from './user-management-update.component';
import { userManagementRoute } from './user-management.route';

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [UserManagementComponent, UserManagementUpdateComponent],
  entryComponents: []
})
export class UserManagementModule {}
