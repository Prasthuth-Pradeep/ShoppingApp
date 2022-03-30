import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/purchase';
import { AuthService } from 'src/app/service/auth.service';
import { PurchaseService } from 'src/app/service/purchase.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  userStatus!: boolean;
  userId: any;
  orders!: IOrder[];

  popupOrderId!: number;
  addressHover: boolean = false;
  reqOrderCancel: boolean = false;
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private ordersRefreshSubscribtion = new Subscription();
  private clickEventCancelOrderPopoverCloseSubscription = new Subscription();

  constructor(private authService: AuthService,
    private purchaseService: PurchaseService,
    private sharedService: SharedService) { }

  async ngOnInit(): Promise<void> {
    
    this.ordersRefreshSubscribtion = this.purchaseService.refreshNotification.subscribe(() => {
      this.orderList();
    })

    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });

    this.clickEventCancelOrderPopoverCloseSubscription =
    this.purchaseService.isCancelOrderPopoverClose.subscribe(() => {
      this.onCancelOrderCancelPopup();
    })

    this.orderList();
  }

  orderList() {
    if (this.userStatus === true) {
      this.purchaseService.getOrderList(this.userId).subscribe((data) => {
        this.orders = data;
        console.log(this.orders)
      });
    }
  }

  onOrderDetails(orderId: number){
    this.sharedService.clickOrderDetails();
    this.purchaseService.sendOrderId(orderId);
  }

  onCancelOrderPopup(orderId: number) {
    this.purchaseService.sendOrderId(orderId);
    this.reqOrderCancel = true;
  }
  onCancelOrderCancelPopup() {
    this.reqOrderCancel = false;
  }

  addressPopover(orderId: number) {
    this.popupOrderId = orderId;
    this.addressHover = true;
  }
  addressPopoverOut() {
    this.addressHover = false;
  }

  ngOnDestroy(): void {
    this.ordersRefreshSubscribtion.unsubscribe();
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.clickEventCancelOrderPopoverCloseSubscription.unsubscribe();
    
  }


}
