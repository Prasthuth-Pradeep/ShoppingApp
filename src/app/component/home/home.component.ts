import { SharedService } from '../../shared/shared.service';
import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  home!: boolean;
  homeClass: string = "home-navbar";
  private userSubscribtion = new Subscription();
  private clickEventPopoverCloseSubscription = new Subscription();
  private clickEventLaptopsSubscription = new Subscription();
  private clickEventCartSubscription = new Subscription();
  private clickEventOrderSubscription = new Subscription();
  private clickEventUserProfileSubscription = new Subscription();
  private clickEventAddressSubscription = new Subscription();
  private clickEventAddAddressSubscription = new Subscription();
  private clickEventOrderDetailsSubscription = new Subscription();


  constructor( private sharedService: SharedService,
    private router: Router,) { }

  async ngOnInit(): Promise<void> {

    this.clickEventPopoverCloseSubscription =
      this.sharedService.isClickBackHome.subscribe(() => {
        this.onHome();
      });

    this.clickEventUserProfileSubscription =
      this.sharedService.isUserProfile.subscribe(() => {
        this.onUserProfile();
      });

    this.clickEventAddressSubscription =
      this.sharedService.isAddress.subscribe(() => {
        this.onAddress();
      });

    this.clickEventAddAddressSubscription =
      this.sharedService.isAddAddress.subscribe(() => {
        this.onAddAddress();
      });

    this.clickEventCartSubscription =
      this.sharedService.isCart.subscribe(() => {
        this.onCart();
      });

    this.clickEventOrderSubscription =
      this.sharedService.isOrder.subscribe(() => {
        this.onOrder();
      });

    this.clickEventOrderDetailsSubscription =
      this.sharedService.isOrderDetails.subscribe(() => {
        this.onOrderDetails();
      });
  }

  onCart() {
    this.router.navigate(['/home/cart']);
  }

  onUserProfile() {
    this.router.navigate(['/home/profile']);
  }

  onAddress() {
    this.router.navigate(['/home/profile/address'])
  }

  onAddAddress() {
    this.router.navigate(['/home/profile/address/add-address'])
  }

  onOrder() {
    this.router.navigate(['/home/profile/order/list']);
  }

  onOrderDetails() {
    this.router.navigate(['/home/profile/order/order-details']);
  }

  onHome() {
    this.sharedService.sendHomeClassName(this.homeClass);
    this.router.navigate(['/home/deals'])
  }

  ngOnDestroy(): void {
    this.userSubscribtion.unsubscribe();
    this.clickEventPopoverCloseSubscription.unsubscribe();
    this.clickEventLaptopsSubscription.unsubscribe();
    this.clickEventCartSubscription.unsubscribe();
    this.clickEventOrderSubscription.unsubscribe();
    this.clickEventUserProfileSubscription.unsubscribe();
    this.clickEventAddressSubscription.unsubscribe();
    this.clickEventAddAddressSubscription.unsubscribe();
    this.clickEventOrderDetailsSubscription.unsubscribe();
  }

}
