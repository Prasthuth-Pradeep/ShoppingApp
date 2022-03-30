import { UserService } from './../../../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.scss']
})
export class AddNewAddressComponent implements OnInit {

  userStatus!: boolean;
  userId: any;
  addressForm: FormGroup;
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();

  constructor( private authService: AuthService,
    private userService: UserService,
    private sharedService:SharedService,
    private addressFormBuilder: FormBuilder,
    ) {
      this.addressForm = this.addressFormBuilder.group({
        fullname: ['', [Validators.required]],
        mobilenumber: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
        residencyname: ['', [Validators.required]],
        area: ['', [Validators.required]],
        landmark: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]]
      })
    }
    
    async ngOnInit(): Promise<void> {

      this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
        this.userStatus = data;
      });
      this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
        this.userId = data;
      });
  
    }

    
  onAddAddress(data: any) {
    const addressData: any = {
      userId: this.userId,
      fullName: data.fullname,
      mobileNumber: data.mobilenumber,
      pinCode: data.pincode,
      residencyName: data.residencyname,
      area: data.area,
      landMark: data.landmark,
      city: data.city,
      state: data.state,
      country: data.country
    }
    this.userService.addAddress(addressData).subscribe((data) => {
      console.log(data);
    })
    this.addressForm.reset();
  }

  onResetAddressFields() {
    this.addressForm.reset();
  }

  onUserProfile() {
    this.sharedService.clickUserProfile();
  }

  onAddress(){
    this.sharedService.clickAddress();
  }


  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
  }
  
}
