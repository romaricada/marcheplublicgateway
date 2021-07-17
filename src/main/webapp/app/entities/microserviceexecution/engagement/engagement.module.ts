import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { EngagementComponent } from './engagement.component';
import { engagementRoute } from './engagement.route';

const ENTITY_STATES = [...engagementRoute];
@NgModule({
    imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EngagementComponent],
    entryComponents: []
})
export class MicroserviceexecutionEngagementModule {
}
