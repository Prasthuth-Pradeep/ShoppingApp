import { SharedService } from 'src/app/shared/shared.service';
import { IAddress } from './../../../models/user';
import { UserService } from './../../../service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { IUser } from 'src/app/models/user';
import { IProduct } from './../../../models/product';
import { ProductService } from './../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.scss']
})
export class LaptopsComponent implements OnInit {

  products: IProduct[] = [];
  user!: IUser;
  userStatus!: boolean;
  userId:any;
  homeClass: string = "home-navbar";
  private userSubscribtion = new Subscription();
  private userStatusSubscribtion = new Subscription();

  constructor(private productService: ProductService,
              private authService: AuthService,
              private purchaseService:PurchaseService,
              private sharedService: SharedService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.sharedService.sendHomeClassName(this.homeClass);
    this.products = await this.productService.getLaptops().toPromise();
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
    this.userStatusSubscribtion.unsubscribe();
  }

  onAddCart(productId: number) {
    if(this.userStatus === true ){
      const orderData: any = {
        userId: this.userId,
        productId: productId,
      }
      this.purchaseService.addToCart(orderData).subscribe((data) => {
        console.log(data);
      })
    } 
    if ( this.userStatus === false){
      this.router.navigate(['/sign-in']);
    }
  } 

  onOrderNow(productId: number){
    if(this.userStatus === true ){
      this.purchaseService.sendProductId(productId);
      
      this.router.navigate(['/order-payment/delivery&payement']);
      }
    if ( this.userStatus === false){
      this.router.navigate(['/sign-in']);
    }
  }
}
