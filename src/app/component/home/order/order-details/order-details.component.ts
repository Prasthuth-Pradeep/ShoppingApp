import { IOrder } from 'src/app/models/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  ordersDetails!: IOrder[];
  private recieveProductIdSubscribtion = new Subscription();
  private orderDetailsSubscribtion = new Subscription();

  constructor(private sharedService: SharedService,
    private purchaseService: PurchaseService) { }

  async ngOnInit(): Promise<void> {

    this.recieveProductIdSubscribtion = this.purchaseService.orderId.subscribe((data) => {
      this.orderId = data;
    })

    this.orderDetailsSubscribtion = this.purchaseService.getOrderDetailsByOrderId(this.orderId).subscribe((data) => {
      this.ordersDetails = data;
      console.log(this.ordersDetails)
    });

  }
  onUserProfile() {
    this.sharedService.clickUserProfile();
  }

  onOrder() {
    this.sharedService.clickOrder()
  }

  ngOnDestroy(): void {
    this.recieveProductIdSubscribtion.unsubscribe();
    this.orderDetailsSubscribtion.unsubscribe();
  }

}
