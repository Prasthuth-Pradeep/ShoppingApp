import { PurchaseService } from 'src/app/service/purchase.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/models/purchase';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit {

  orderId!: number;
  ordersDetails!: IOrder[];
  private recieveProductIdSubscribtion = new Subscription();
  private orderDetailsSubscribtion = new Subscription();

  constructor(private purchaseService: PurchaseService) { }

  async ngOnInit(): Promise<void> {
    this.recieveProductIdSubscribtion = this.purchaseService.orderId.subscribe((data) => {
      this.orderId = data;
    })

    this.orderDetailsSubscribtion = this.purchaseService.getOrderDetailsByOrderId(this.orderId).subscribe((data) => {
      this.ordersDetails = data;
    });

  }

  onCancelOrder(orderId: number){
    this.purchaseService.putCancelOrderReq(orderId).subscribe((data) => {
      console.log(data);
    });
    this.purchaseService.clickCancelOrderPopoverClose();
  }


  ngOnDestroy(): void {
    this.recieveProductIdSubscribtion.unsubscribe();
    this.orderDetailsSubscribtion.unsubscribe();
  }

}
