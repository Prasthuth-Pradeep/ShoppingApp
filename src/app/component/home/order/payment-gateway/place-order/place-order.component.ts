import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IAddress } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/service/purchase.service';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { ProductService } from 'src/app/service/product.service';
import { IOrderTotal, IProduct } from 'src/app/models/product';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  userStatus!: boolean;
  userId: any;
  productId!: number;
  cartId!: number
  addressList!: IAddress[];
  defaultAddress!: IAddress[];
  product!: IProduct[];
  quantityForm: FormGroup;
  orderTotal!: IOrderTotal[];
  quantity: number = 1;
  selected: boolean = false;
  message!: any;
  addAddressPopover: boolean = false;
  paymentType: string = "cash on delivery";
  private recieveProductIdSubscribtion = new Subscription();
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private addressRefreshSubscribtion = new Subscription();
  private productSubscribtion = new Subscription();
  private recieveCartIdSubscribtion = new Subscription();

  constructor(private purchaseService: PurchaseService,
    private authService: AuthService,
    private userService: UserService,
    private productService: ProductService,
    private datePipe: DatePipe,
    private router: Router,
    private quantityFormBuilder: FormBuilder) {
    this.quantityForm = this.quantityFormBuilder.group({
      quantityValue: [1]
    })
  }

  async ngOnInit(): Promise<void> {
    this.addressRefreshSubscribtion = this.userService.refreshNotification.subscribe(() => {
      this.userAddress();
      this.userDefaultAddress();
    })

    this.recieveProductIdSubscribtion = this.purchaseService.productId.subscribe((data) => {
      this.productId = data;
    })
    this.recieveCartIdSubscribtion = this.purchaseService.cartId.subscribe((data) => {
      this.cartId = data;
    })

    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });
    this.productSubscribtion = this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
    });

    this.quantityForm.get('quantityValue')?.valueChanges.subscribe((data) => {
      this.quantity = data
      this.purchaseService.getOrderTotal(this.quantity, this.productId).subscribe((data) => {
        this.orderTotal = data;
        this.selected = true;
      });
    })

    this.userAddress();
    this.userDefaultAddress();
  }

  userAddress() {
    if (this.userStatus === true) {
      this.userService.getAddress(this.userId).subscribe((data) => {
        this.addressList = data;
      });
    }
  }

  userDefaultAddress() {
    if (this.userStatus === true) {
      this.userService.getDefaultAddress(this.userId).subscribe((data) => {
        this.defaultAddress = data;
      });
    }
  }

  onSetDefaultAddress(address_id: number) {
    const defaultAddressData: any = {
      userId: this.userId,
      addressId: address_id
    }
    this.userService.addDefaultAddress(defaultAddressData).subscribe((data) => {
      console.log(data);
    })
  }

  onChangeDeliveryAddress() {
    if (this.addAddressPopover === false) {
      return this.addAddressPopover = true;
    } else {
      return this.addAddressPopover = false
    }
  }

  onOrderNow(date: string) {
    let fltDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    const orderData: any = {
      userId: this.userId,
      addressId: this.defaultAddress[0].address_id,
      productId: this.productId,
      productQuantity: this.quantity,
      payment: this.paymentType,
      deliveryDate: fltDate
    }
    this.purchaseService.sendOrderDetails(orderData).subscribe((data) => {
      console.log(data)
      this.message = data;
      if (this.message.message = "order placed") {
        this.purchaseService.removeCartItem(this.cartId).subscribe((data) => {
          console.log(data);
        });
        this.router.navigate(['home/profile/order/list'])
      }

    })
  }

  ngOnDestroy(): void {
    this.recieveProductIdSubscribtion.unsubscribe();
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.addressRefreshSubscribtion.unsubscribe();
    this.productSubscribtion.unsubscribe();
    this.recieveCartIdSubscribtion.unsubscribe();
  }
}
