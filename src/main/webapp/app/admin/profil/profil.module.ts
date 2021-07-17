import { NgModule } from '@angular/core';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from 'app/admin/profil/profil.component';
import { profilRoute } from 'app/admin/profil/profil.route';

const ENTITY_STATES = [...profilRoute];

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ProfilComponent]
})
export class ProfilModule {}
