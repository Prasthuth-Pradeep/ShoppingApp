import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-and-payement',
  templateUrl: './delivery-and-payement.component.html',
  styleUrls: ['./delivery-and-payement.component.scss']
})
export class DeliveryAndPayementComponent implements OnInit {

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
  }

  onPlaceOrder() {
    this.router.navigate(['/order-payment/order-placement']);
  }

  onContnue() {
  }

}
