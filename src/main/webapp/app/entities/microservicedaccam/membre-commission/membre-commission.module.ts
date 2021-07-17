import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MarchepublicgatewaySharedModule} from 'app/shared/shared.module';
import {MembreCommissionComponent} from './membre-commission.component';
import {membreCommissionRoute, membreCommissionPopupRoute} from './membre-commission.route';

const ENTITY_STATES = [...membreCommissionRoute, ...membreCommissionPopupRoute];

@NgModule({
    imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MembreCommissionComponent
    ],
    entryComponents: []
})
export class MicroservicedaccamMembreCommissionModule {
}
