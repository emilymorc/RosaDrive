import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Login2Component} from "./login2/login2.component";
import {CreateAccountComponent} from "./account/create-account/create-account.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {BodyComponent} from "./body/body.component";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PagesComponent} from "./pages/pages.component"
import {ViewUsersComponent} from "./account/view-users/view-users.component";
import {ModifyAccountComponet} from "./account/modify-account/modify-account.component";
import {LandingComponent} from "./landing/landing.component";
import {AutostorieComponent} from "./autostories/autostorie/autostorie.component";
import {AuthService} from "./servicios/auth.service";
import {AuthGuard} from "./auth.guard";
import {LogoutComponent} from "./logout/logout.component";
import {ViewautostoriesComponent} from "./autostories/viewautostories/viewautostories.component";
import {CreateOrderServiceComponent} from "./order-service/create-order-service/create-order-service.component";
import {OrderServiceComponent} from "./order-service/order-service.component";
import {ViewOrdersComponent} from "./order-service/view-orders/view-orders.component"
import {DetailsHistoryComponent} from "./autostories/details-history/details-history.component";
import {DetailsOrderComponent} from "./order-service/details-order/details-order.component";
import {ModifyOrderComponent} from "./order-service/modify-order/modify-order.component";
import {AddChangeComponent} from "./order-service/add-change/add-change.component"
import {ModifyautostoriesComponent} from "./autostories/modifyautostories/modifyautostories.component";

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
      {path: 'viewStories', component: ViewautostoriesComponent},
      {path: 'createOrder', component: OrderServiceComponent},
      {path: 'detailsHistory', component: DetailsHistoryComponent, canActivate:[AuthGuard]},
      {path: 'modifyHistory', component: ModifyautostoriesComponent, canActivate:[AuthGuard]},
      {path: 'viewOrder', component: ViewOrdersComponent},
      {path: 'detailsOrder', component: DetailsOrderComponent},
      {path: 'modifyOrder', component: ModifyOrderComponent},
      {path: 'detailsOrder', component: DetailsOrderComponent},
      {path: 'changeOrder', component: AddChangeComponent}
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
