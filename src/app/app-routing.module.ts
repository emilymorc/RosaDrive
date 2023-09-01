import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Login2Component} from "./login2/login2.component";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {RouterModule, Routes} from "@angular/router";
import {ViewUsersComponent} from "./view-users/view-users.component";
import {ModifyAccountComponet} from "./modify-account/modify-account.component";

const routes: Routes = [
  {path: '.', component:Login2Component},
  {path: 'create', component: CreateAccountComponent},
  {path: 'view-users', component: ViewUsersComponent},
  {path: 'modifyAccount', component: ModifyAccountComponet}
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
