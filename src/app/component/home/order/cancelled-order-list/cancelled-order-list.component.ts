import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/purchase';
import { AuthService } from 'src/app/service/auth.service';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-cancelled-order-list',
  templateUrl: './cancelled-order-list.component.html',
  styleUrls: ['./cancelled-order-list.component.scss']
})
export class CancelledOrderListComponent implements OnInit {

  userStatus!: boolean;
  userId: any;
  cancelledOrders!: IOrder[];
  popupOrderId!: number;
  addressHover: boolean = false;
  reqOrderCancel: boolean = false;
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  constructor(private authService: AuthService,
    private purchaseService: PurchaseService,) { }

  async ngOnInit(): Promise<void> {

    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });

    this.orderList();
  }

  orderList() {
    if (this.userStatus === true) {
      this.purchaseService.getCancelledOrders(this.userId).subscribe((data) => {
        this.cancelledOrders = data;
        console.log(this.cancelledOrders)
      });
    }
  }

  onCancelOrder(orderId: number) {
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
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
  }


}
