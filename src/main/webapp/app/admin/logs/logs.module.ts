import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';

import { LogsComponent } from './logs.component';

import { logsRoute } from './logs.route';

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild([logsRoute])],
  declarations: [LogsComponent]
})
export class LogsModule {}
