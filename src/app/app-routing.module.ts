import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogginComponent} from "./loggin/loggin.component";
import {CreateAccountComponent} from "./menu/create-account/create-account.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'login', component: LogginComponent},
  {path: 'create-account', component: CreateAccountComponent}
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
