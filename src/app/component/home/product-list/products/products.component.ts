import { SharedService } from 'src/app/shared/shared.service';
import { AuthService } from 'src/app/service/auth.service';
import { IUser } from 'src/app/models/user';
import { IBrand, IProduct } from '../../../../models/product';
import { ProductService } from '../../../../service/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchaseService } from 'src/app/service/purchase.service';

@Component({
  selector: 'app-laptops',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products!: IProduct[];
  filteredProducts: IProduct[] = [];
  categoryId!:number;
  brands!: IBrand[];
  user!: IUser;
  userStatus!: boolean;
  userId:any;
  homeClass: string = "home-navbar";
  private recieveCategoryIdSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private userStatusSubscribtion = new Subscription();

  constructor(private productService: ProductService,
              private authService: AuthService,
              private purchaseService:PurchaseService,
              private sharedService: SharedService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.categoryId = +params['id'];
      this.productService.getLaptops().subscribe((data) => {
        this.products = data;
      });
    })
    this.brands = await this.productService.getBrands().toPromise();
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    
    this.onAll();
  }

  onAll(){
    this.filteredProducts = this.products;
  }

  onFilter(brand_name: string) {
    this.filteredProducts = this.products.filter((el: any) => {
      if (el.brand_name == brand_name ) {
        return el
      }
    })
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

  ngOnDestroy(): void {
    this.recieveCategoryIdSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.userStatusSubscribtion.unsubscribe();
  }
  
}
