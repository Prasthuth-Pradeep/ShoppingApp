import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { SignInComponent } from './component/auth/sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { LaptopsComponent } from './component/home/laptops/laptops.component';
import { HeaderComponent } from './component/home/header/header.component';
import { LaptopDetailsComponent } from './component/home/laptops/laptop-details/laptop-details.component';
import { ReviewsComponent } from './component/home/reviews/reviews.component';
import { ReplayComponent } from './component/home/reviews/replay/replay.component';
import { CartComponent } from './component/home/cart/cart.component';
import { WishListComponent } from './component/home/wish-list/wish-list.component';
import { OrderComponent } from './component/home/order/order.component';
import { AddressComponent } from './component/home/address/address.component';
import { UserDashboardComponent } from './component/home/user-dashboard/user-dashboard.component';
import { AddressPopupComponent } from './component/home/address/address-popup/address-popup.component';
import { AddNewAddressComponent } from './component/home/address/add-new-address/add-new-address.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminPanelComponent } from './component/admin/admin-panel/admin-panel.component';
import { AdminHeaderComponent } from './component/admin/admin-header/admin-header.component';
import { OrderControlComponent } from './component/admin/order-control/order-control.component';
import { ProductControlComponent } from './component/admin/product-control/product-control.component';
import { PaymentGatewayComponent } from './component/home/order/payment-gateway/payment-gateway.component';
import { OrderListComponent } from './component/home/order/order-list/order-list.component';
import { PendingOrderListComponent } from './component/home/order/pending-order-list/pending-order-list.component';
import { CancelledOrderListComponent } from './component/home/order/cancelled-order-list/cancelled-order-list.component';
import { DeliveryAndPayementComponent } from './component/home/order/payment-gateway/delivery-and-payement/delivery-and-payement.component';
import { PlaceOrderComponent } from './component/home/order/payment-gateway/place-order/place-order.component';
import { DatePipe } from '@angular/common';
import { CancelOrderComponent } from './component/home/order/order-list/cancel-order/cancel-order.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { OrderDetailsComponent } from './component/home/order/order-details/order-details.component';
import { ShowroomComponent } from './component/home/showroom/showroom.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    LaptopsComponent,
    HeaderComponent,
    LaptopDetailsComponent,
    ReviewsComponent,
    ReplayComponent,
    CartComponent,
    WishListComponent,
    OrderComponent,
    AddressComponent,
    UserDashboardComponent,
    AddressPopupComponent,
    AddNewAddressComponent,
    AdminComponent,
    AdminPanelComponent,
    AdminHeaderComponent,
    OrderControlComponent,
    ProductControlComponent,
    PaymentGatewayComponent,
    OrderListComponent,
    PendingOrderListComponent,
    CancelledOrderListComponent,
    PlaceOrderComponent,
    DeliveryAndPayementComponent,
    CancelOrderComponent,
    OrderDetailsComponent,
    ShowroomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
