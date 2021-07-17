import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import {AccueilComponent} from "app/home/accueil.component";

@NgModule({
  imports: [MarchepublicgatewaySharedModule, RouterModule.forChild(HOME_ROUTE)],
  declarations: [HomeComponent, AccueilComponent]
})
export class MarchepublicgatewayHomeModule {}
