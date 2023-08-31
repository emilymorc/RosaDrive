import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {RouterLink} from "@angular/router";
import {BodyComponent} from "./body/body.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProductsComponent} from "./products/products.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {CoupensComponent} from "./coupens/coupens.component";
import {PagesComponent} from "./pages/pages.component";
import {MediaComponent} from "./media/media.component";
import {SettingsComponent} from "./settings/settings.component";
import {AppRoutingModule} from "./app-routing.module";
import {SublevelMenuComponent} from "./sidenav/sublevel-menu.components";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    LogginComponent,
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent,
    SettingsComponent,
    SublevelMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
