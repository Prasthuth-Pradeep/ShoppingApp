import { ShowroomComponent } from './component/home/showroom/showroom.component';
import { OrderDetailsComponent } from './component/home/order/order-details/order-details.component';
import { PlaceOrderComponent } from './component/home/order/payment-gateway/place-order/place-order.component';
import { PendingOrderListComponent } from './component/home/order/pending-order-list/pending-order-list.component';
import { PaymentGatewayComponent } from './component/home/order/payment-gateway/payment-gateway.component';
import { ProductControlComponent } from './component/admin/product-control/product-control.component';
import { OrderControlComponent } from './component/admin/order-control/order-control.component';
import { AdminRoleGuard } from './guard/adminRole.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './component/auth/sign-up/sign-up.component';
import { SignInComponent } from './component/auth/sign-in/sign-in.component';
import { HomeComponent } from './component/home/home.component';
import { OrderComponent } from './component/home/order/order.component';
import { WishListComponent } from './component/home/wish-list/wish-list.component';
import { UserDashboardComponent } from './component/home/user-dashboard/user-dashboard.component';
import { AddNewAddressComponent } from './component/home/address/add-new-address/add-new-address.component';
import { AddressComponent } from './component/home/address/address.component';
import { CartComponent } from './component/home/cart/cart.component';
import { AdminComponent } from './component/admin/admin.component';
import { AdminPanelComponent } from './component/admin/admin-panel/admin-panel.component';
import { UserRoleGuard } from './guard/user-role.guard';
import { OrderListComponent } from './component/home/order/order-list/order-list.component';
import { CancelledOrderListComponent } from './component/home/order/cancelled-order-list/cancelled-order-list.component';
import { DeliveryAndPayementComponent } from './component/home/order/payment-gateway/delivery-and-payement/delivery-and-payement.component';
import { ProductsComponent } from './component/home/products/laptops.component';


const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },

  {
    path: 'home', component: HomeComponent, canActivate: [UserRoleGuard], children: [
      { path: 'deals', component: ShowroomComponent },
      { path: ':id/:product-name', component: ProductsComponent, },
      { path: 'product/:id', component: OrderDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: UserDashboardComponent },
      {
        path: 'profile/order', component: OrderComponent, children: [
          { path: 'list', component: OrderListComponent },
          { path: 'pending-list', component: PendingOrderListComponent },
          { path: 'cancelled-list', component: CancelledOrderListComponent }
        ]
      },
      { path: 'profile/order/order-details', component: OrderDetailsComponent },
      { path: 'profile/address', component: AddressComponent },
      { path: 'profile/address/add-address', component: AddNewAddressComponent },
      { path: 'wish-list', component: WishListComponent },
    ]
  },

  {
    path: 'order-payment', component: PaymentGatewayComponent, canActivate: [UserRoleGuard], children: [
      { path: 'delivery&payement', component: DeliveryAndPayementComponent },
      { path: 'order-placement', component: PlaceOrderComponent },
    ]
  },

  {
    path: 'admin', component: AdminComponent, canActivate: [AdminRoleGuard], children: [
      { path: 'admin-panel', component: AdminPanelComponent },
      { path: 'product-control', component: ProductControlComponent },
      { path: 'order-control', component: OrderControlComponent },]
  },

  { path: '**', redirectTo: 'home/deals' },
  { path: '', redirectTo: 'home/deals', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
