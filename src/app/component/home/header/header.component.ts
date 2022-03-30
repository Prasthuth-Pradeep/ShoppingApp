import { ProductService } from 'src/app/service/product.service';
import { ICart } from './../../../models/purchase';
import { PurchaseService } from 'src/app/service/purchase.service';
import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { IuserDetails, IAddress } from 'src/app/models/user';
import { SharedService } from '../../../shared/shared.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ICategory } from 'src/app/models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  dropdownClass!: string;
  navbar!: string;
  dropdown: boolean = false;
  addressPopOver: boolean = false;
  userStatus!: boolean;
  userId: any;
  userDetails!: IuserDetails[];
  cartItems!: ICart[];
  address!: IAddress[];
  defaultAddress!: IAddress[];
  categories!:ICategory[];
  showProfilePopover: boolean = false;
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private clickEventAddressPopoverCloseSubscription = new Subscription();
  private cartRefreshSubscribtion = new Subscription();
  private addressRefreshSubscribtion = new Subscription();
  private homeClassNameSubscribtion = new Subscription();
  private cartClassNameSubscribtion = new Subscription();
  private isSearchSubscription = new Subscription();

  constructor(private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService,
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.categories = await this.productService.getCategory().toPromise();
    this.cartRefreshSubscribtion = this.purchaseService.refreshNotification.subscribe(() => {
      this.cartItem();
    })

    this.addressRefreshSubscribtion = this.userService.refreshNotification.subscribe(() => {
      this.userAddress();
      this.userDefaultAddress();
    })

    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });

    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });

    this.cartClassNameSubscribtion = this.sharedService.receiveCartClassName.subscribe((data) => {
      if (this.userStatus === false) {
        this.navbar = data;
      }
    })

    this.homeClassNameSubscribtion = this.sharedService.receiveHomeClassName.subscribe((data) => {
      this.navbar = data;
    })

    this.clickEventAddressPopoverCloseSubscription =
      this.sharedService.isAddressPopoverClose.subscribe(() => {
        this.onCloseAddressPopover();
      })

    this.userDetail();
    this.cartItem();
    this.userAddress();
    this.userDefaultAddress();
  }

  userDetail() {
    if (this.userStatus === true) {
      this.userService.getUserDetails(this.userId).subscribe((data) => {
        this.userDetails = data;
      });
    }
  }

  cartItem() {
    if (this.userStatus === true) {
      this.purchaseService.getCart(this.userId).subscribe((data) => {
        this.cartItems = data;
      });
    }
  }

  userAddress() {
    if (this.userStatus === true) {
      this.userService.getAddress(this.userId).subscribe((data) => {
        this.address = data;
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

  @HostListener('document:click', ['$event'])
  clickOutside(event:any): void{
    if(this.dropdownRef.nativeElement.contains(event.target)){
      this.dropdown = true;
    }else{
      this.dropdown = false;
    }
  }

  onClickProducts( categoryId: number) {
    this.productService.sendCategoryId(categoryId);
    this.sharedService.clickProducts();
  }

  onClickLaptops() {
    this.sharedService.clickProducts();
  }

  onClickCart() {
    this.sharedService.clickCart();
  }

  onUserProfile() {
    this.sharedService.clickUserProfile();
  }


  onClickOrder() {
    this.sharedService.clickOrder();
  }

  onAddressPopover() {
    this.addressPopOver = true;
  }
  onCloseAddressPopover() {
    this.addressPopOver = false;
  }

  onHomePage() {
    this.sharedService.clickBackHome();
  }

  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.clickEventAddressPopoverCloseSubscription.unsubscribe();
    this.homeClassNameSubscribtion.unsubscribe();
    this.cartClassNameSubscribtion.unsubscribe();
    this.cartRefreshSubscribtion.unsubscribe();
    this.addressRefreshSubscribtion.unsubscribe();
    this.isSearchSubscription.unsubscribe();
  }

}
