import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {animation} from "@angular/animations";
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { AppComponent } from './app.component';
import {SidenavComponent} from "./sidenav/sidenav.component";
import {BodyComponent} from "./body/body.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
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
/*import { ViewUsersComponent } from './view-users/view-users.component';
import {ModifyAccountComponet} from "./modify-account/modify-account.component";*/
import {ViewUsersComponent} from "./view-users/view-users.component";
import {ModifyAccountComponet} from "./modify-account/modify-account.component";
import { LandingComponent } from './landing/landing.component';
import { AutostorieComponent } from './autostorie/autostorie.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewautostoriesComponent } from './viewautostories/viewautostories.component';
import { ModifyautostoriesComponent } from './modifyautostories/modifyautostories.component';




@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SublevelMenuComponent,
    CreateAccountComponent,
    Login2Component,
    ViewUsersComponent,
    ModifyAccountComponet,
    LandingComponent,
    AutostorieComponent,
    LandingComponent,
    LogoutComponent,
    ViewautostoriesComponent,
    ModifyautostoriesComponent
  ],
    imports: [
        PaginationModule.forRoot(),
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
