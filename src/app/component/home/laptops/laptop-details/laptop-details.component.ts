import { AuthService } from 'src/app/service/auth.service';
import { PurchaseService } from 'src/app/service/purchase.service';
import { IProductDetails } from '../../../../models/product';
import { ProductService } from '../../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-laptop-details',
  templateUrl: './laptop-details.component.html',
  styleUrls: ['./laptop-details.component.scss']
})
export class LaptopDetailsComponent implements OnInit {


  userStatus!: boolean;
  id!: number;
  product!: IProductDetails[];
  like: boolean = false;
  userId: any;
  private userSubscribtion = new Subscription();
  private userStatusSubscribtion = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productService.getLaptopById(this.id).subscribe((data) => {
        this.product = data;
      });
    })
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
  }

  onWishlistRemove() {
    if (this.userStatus === true) {
      this.like = false;
    }
    if (this.userStatus === false) {
      this.router.navigate(['/sign-in']);
    }
  }

  onWishlistAdd() {
    if (this.userStatus === true) {
      this.like = true;
    }
    if (this.userStatus === false) {
      this.router.navigate(['/sign-in']);
    }
  }

  onAddCart(productId: number) {
    if (this.userStatus === true) {
      const cartData: any = {
        userId: this.userId,
        productId: productId,
      }
      this.purchaseService.addToCart(cartData).subscribe((data) => {
        console.log(data);
      })
    }
    if (this.userStatus === false) {
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
  
  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
    this.userStatusSubscribtion.unsubscribe();
  }

}
