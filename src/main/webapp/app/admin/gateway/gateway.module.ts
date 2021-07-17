import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';

import { JhiGatewayComponent } from './gateway.component';

import { gatewayRoute } from './gateway.route';

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild([gatewayRoute])],
  declarations: [JhiGatewayComponent]
})
export class GatewayModule {}
