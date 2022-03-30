import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { IAddress } from './../../../models/user';
import { ICart } from './../../../models/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  userStatus!: boolean;
  userId: any;
  cartTotal!: any;
  cartItems!: ICart[];
  defaultAddress!: IAddress[];
  cartClass: string = "cart-navbar";
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private cartTotalSubscribtion = new Subscription();
  private addressRefreshSubscribtion = new Subscription();

  constructor(private authService: AuthService,
    private sharedService: SharedService,
    private purchaseService: PurchaseService,
    private userService: UserService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.sharedService.sendCartClassName(this.cartClass);
    this.addressRefreshSubscribtion = this.userService.refreshNotification.subscribe(() => {
      this.getUserDefaultAddress();
    })
    this.cartTotalSubscribtion = this.purchaseService.refreshNotification.subscribe(() => {
      this.getCartTotal();
      this.getCartItem();
    })
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });

    this.getCartTotal();
    this.getCartItem();
    this.getUserDefaultAddress();
  }

  getCartTotal() {
    if (this.userStatus === true) {
      this.purchaseService.getCartTotal(this.userId).subscribe((data) => {
        this.cartTotal = data;
      });
    }
  }

  getCartItem() {
    if (this.userStatus === true) {
      this.purchaseService.getCart(this.userId).subscribe((data) => {
        this.cartItems = data;
      });
    }
  }

  getUserDefaultAddress() {
    if (this.userStatus === true) {
      this.userService.getDefaultAddress(this.userId).subscribe((data) => {
        this.defaultAddress = data;
      });
    }
  }

  onRemoveCartItem(id:number){
    this.purchaseService.removeCartItem(id).subscribe((data) => {
      console.log(data);
    })
  }

  onOrderNow(productId: number, cartId:number){
    if(this.userStatus === true ){
      this.purchaseService.sendProductId(productId);
      this.purchaseService.sendCartId(cartId);
      
      this.router.navigate(['/order-payment/delivery&payement']);
      }
    if ( this.userStatus === false){
      this.router.navigate(['/sign-in']);
    }
  }
  

  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.cartTotalSubscribtion.unsubscribe();
    this.addressRefreshSubscribtion.unsubscribe();
  }
}
