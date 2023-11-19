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
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { Login2Component } from './login2/login2.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
/*import { ViewUsersComponent } from './view-users/view-users.component';
import {ModifyAccountComponet} from "./modify-account/modify-account.component";*/
import {ViewUsersComponent} from "./account/view-users/view-users.component";
import {ModifyAccountComponet} from "./account/modify-account/modify-account.component";
import { LandingComponent } from './landing/landing.component';
import { AutostorieComponent } from './autostories/autostorie/autostorie.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewautostoriesComponent } from './autostories/viewautostories/viewautostories.component';
import { ModifyautostoriesComponent } from './autostories/modifyautostories/modifyautostories.component';
import { CreateOrderServiceComponent } from './order-service/create-order-service/create-order-service.component';
import { AutostoriesComponent } from './autostories/autostories.component';
import { AccountComponent } from './account/account.component';
import { OrderServiceComponent } from './order-service/order-service.component';
import { ViewOrdersComponent } from './order-service/view-orders/view-orders.component';
import { DetailsOrderComponent } from './order-service/details-order/details-order.component';
import { DetailsHistoryComponent } from './autostories/details-history/details-history.component';
import { ModifyOrderComponent } from './order-service/modify-order/modify-order.component';
import { AddChangeComponent } from './order-service/add-change/add-change.component';
import { CreateAppoitmentComponent } from './appoitment/create-appoitment/create-appoitment.component';
import { AppoitmentComponent } from './appoitment/appoitment.component';
import { ViewApoimentComponent } from './appoitment/view-apoiment/view-apoiment.component';
import { ModifyAppoitmentComponent } from './appoitment/modify-appoitment/modify-appoitment.component';
import { ReportComponent } from './report/report.component';
import {ReportAppoitmetsByDayComponent} from "./report/reportAppoitments/reportAppoitmentsByDay/report.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {ReportAppoitmentWeek} from "./report/reportAppoitments/reportAppoitmentWeek/report.component";
import { ReportOrderByDayComponent } from './report/reportOrders/report-order-by-day/report-order-by-day.component';
import { ReportOrderByWeekComponent } from './report/reportOrders/report-order-by-week/report-order-by-week.component';
import { ReportOrderByMonthComponent } from './report/reportOrders/report-order-by-month/report-order-by-month.component';
import { ReportIcomeByDayComponent } from './report/reportIcome/report-icome-by-day/report-icome-by-day.component';
import { ReportIcomeByMonthComponent } from './report/reportIcome/report-icome-by-month/report-icome-by-month.component';
import { ReportIcomeByYearComponent } from './report/reportIcome/report-icome-by-year/report-icome-by-year.component';
import { ReportHistoryComponent } from './report/report-history/report-history.component';
import { ReportAppoitmetsByMonthComponent } from './report/reportAppoitments/report-appoitmets-by-month/report-appoitmets-by-month.component';
// import { NgApexchartsModule } from 'ngx-apexcharts';




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
    ModifyautostoriesComponent,
    CreateOrderServiceComponent,
    AutostoriesComponent,
    AccountComponent,
    OrderServiceComponent,
    ViewOrdersComponent,
    DetailsOrderComponent,
    DetailsHistoryComponent,
    ModifyOrderComponent,
    AddChangeComponent,
    CreateAppoitmentComponent,
    AppoitmentComponent,
    ViewApoimentComponent,
    ModifyAppoitmentComponent,
    ReportComponent,
      ReportAppoitmetsByDayComponent,
      ReportAppoitmentWeek,
      ReportOrderByDayComponent,
      ReportOrderByWeekComponent,
      ReportOrderByMonthComponent,
      ReportIcomeByDayComponent,
      ReportIcomeByMonthComponent,
      ReportIcomeByYearComponent,
      ReportHistoryComponent,
      ReportAppoitmetsByMonthComponent
  ],
    imports: [
        PaginationModule.forRoot(),
        BrowserModule,
 //     NgApexchartsModule,
        RouterOutlet,
        HttpClientModule,
      NgApexchartsModule,
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
