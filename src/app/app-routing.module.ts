import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Login2Component} from "./login2/login2.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {BodyComponent} from "./body/body.component";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages/pages.component"
import {ViewUsersComponent} from "./view-users/view-users.component";
import {ModifyAccountComponet} from "./modify-account/modify-account.component";
import {LandingComponent} from "./landing/landing.component";


const routes: Routes = [
  {path: '.', component:Login2Component},
  {path: 'create', component: CreateAccountComponent},
  {path: 'view-users', component: ViewUsersComponent},
  {path: 'modifyAccount', component: ModifyAccountComponet},
  {path: '', component:Login2Component},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'sidebar', component: SidenavComponent },
      { path: 'AppBody', component:BodyComponent },
      { path: 'create', component: CreateAccountComponent},
      { path: 'pages', component: PagesComponent},
      {path: 'view-users', component: ViewUsersComponent},
      {path: 'modifyAccount', component: ModifyAccountComponet},
      {path: 'landing', component: LandingComponent}
    ]
  },
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
