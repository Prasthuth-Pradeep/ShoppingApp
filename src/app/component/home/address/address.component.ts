import { SharedService } from 'src/app/shared/shared.service';
import { IAddress } from './../../../models/user';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  userStatus!: boolean;
  userId: any;
  address!: IAddress[];
  addAddress: boolean = false;
  defaultAddress!: IAddress[];
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private addressRefreshSubscribtion = new Subscription();

  constructor(private authService: AuthService,
    private userService: UserService,
    private sharedService: SharedService
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

  onRemoveAddress(id: number) {
    this.userService.deleteAddress(id).subscribe((data) => {
      console.log(data);
    })
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
  }

  onUserProfile() {
    this.sharedService.clickUserProfile();
  }


  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.addressRefreshSubscribtion.unsubscribe();
  }

}
