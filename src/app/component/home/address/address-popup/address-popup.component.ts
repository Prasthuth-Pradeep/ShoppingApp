import { SharedService } from './../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IAddress } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.scss']
})
export class AddressPopupComponent implements OnInit {
  userStatus!: boolean;
  userId: any;
  address!: IAddress[];
  addAddress: boolean = false;
  defaultAddress!: IAddress[];
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private addressRefreshSubscribtion = new Subscription();

  constructor(private authService: AuthService,
    private sharedService: SharedService,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.addressRefreshSubscribtion = this.userService.refreshNotification.subscribe(() => {
      this.userAddress();
      this.userDefaultAddress();
    })

    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });

    this.userAddress();
    this.userDefaultAddress();
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


  onSetDefaultAddress(address_id:number){
    const defaultAddressData: any = {
      userId: this.userId,
      addressId: address_id
    }
    this.userService.addDefaultAddress(defaultAddressData).subscribe((data) => {
      console.log(data);
    })
  }
  onAddAddress() {
    this.sharedService.clickAddAddress();
    this.sharedService.clickAddressPopoverClose();
  }

  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.addressRefreshSubscribtion.unsubscribe();
  }

}
