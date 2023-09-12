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
import {AutostorieComponent} from "./autostorie/autostorie.component";
import {AuthService} from "./servicios/auth.service";
import {AuthGuard} from "./auth.guard";
import {LogoutComponent} from "./logout/logout.component";
import {ViewautostoriesComponent} from "./viewautostories/viewautostories.component";


const routes: Routes = [
  {path: '.', component:Login2Component},
  {path: 'create', component: CreateAccountComponent},
  {path: 'view-users', component: ViewUsersComponent},
  {path: 'modifyAccount', component: ModifyAccountComponet},
  {path: '', component:Login2Component},
  {path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'sidebar', component: SidenavComponent },
      { path: 'AppBody', component:BodyComponent },
      { path: 'create', component: CreateAccountComponent},
      { path: 'pages', component: PagesComponent},
      {path: 'view-users', component: ViewUsersComponent},
      {path: 'modifyAccount', component: ModifyAccountComponet},
      {path: 'landing', component: LandingComponent},
      {path: 'history', component: AutostorieComponent},
      { path: 'sidebar', component: SidenavComponent, canActivate:[AuthGuard]},
      { path: 'AppBody', component:BodyComponent, canActivate:[AuthGuard] },
      { path: 'create', component: CreateAccountComponent, canActivate:[AuthGuard]},
      { path: 'pages', component: PagesComponent, canActivate:[AuthGuard]},
      {path: 'view-users', component: ViewUsersComponent, canActivate:[AuthGuard]},
      {path: 'modifyAccount', component: ModifyAccountComponet, canActivate:[AuthGuard]},
      {path: 'landing', component: LandingComponent, canActivate:[AuthGuard]},
      {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
      {path: 'viewStories', component: ViewautostoriesComponent}
    ] ,canActivate:[AuthGuard]
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
