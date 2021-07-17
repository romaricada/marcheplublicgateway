import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MarchepublicgatewaySharedModule } from 'app/shared/shared.module';
import { MarchepublicgatewayCoreModule } from 'app/core/core.module';
import { MarchepublicgatewayAppRoutingModule } from './app-routing.module';
import { MarchepublicgatewayHomeModule } from './home/home.module';
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MarchepublicgatewayEntityModule} from "app/entities/entity.module";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import {EffectsModule} from '@ngrx/effects';
import {MarchePublicEffect} from 'app/store/effect';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MarchepublicgatewaySharedModule,
    MarchepublicgatewayCoreModule,
    MarchepublicgatewayHomeModule,
    MarchepublicgatewayEntityModule,
    MarchepublicgatewayAppRoutingModule,
    NoopAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot([MarchePublicEffect])
  ],
  declarations: [JhiMainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
  ],
  bootstrap: [JhiMainComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MarchepublicgatewayAppModule {}
