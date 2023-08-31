import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Login2Component } from './login2/login2.component';
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    LogginComponent,
    CreateAccountComponent,
    Login2Component
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
      HttpClientModule,
      CommonModule,
      FormsModule
    ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
