import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {animation} from "@angular/animations";

import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import {SidenavComponent} from "./sidenav/sidenav.component";
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
import { CreateAccountComponent } from './create-account/create-account.component';
import { Login2Component } from './login2/login2.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { ViewUsersComponent } from './view-users/view-users.component';


@NgModule({
  declarations: [
    AppComponent,
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
    CreateAccountComponent,
    Login2Component,
    ViewUsersComponent
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        HttpClientModule,
        CommonModule,
        FormsModule,
        RouterLink,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      AppRoutingModule
    ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
