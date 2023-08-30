import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { CreateAccountComponent } from './menu/create-account/create-account.component';
import { BodyComponent } from './menu/body/body.component';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { DashboardComponent } from './menu/dashboard/dashboard.component';
import { ProductsComponent } from './menu/products/products.component';
import { StatisticsComponent } from './menu/statistics/statistics.component';
import { CoupensComponent } from './menu/coupens/coupens.component';
import { PagesComponent } from './menu/pages/pages.component';
import { MediaComponent } from './menu/media/media.component';

@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    CreateAccountComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ProductsComponent,
    StatisticsComponent,
    CoupensComponent,
    PagesComponent,
    MediaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
