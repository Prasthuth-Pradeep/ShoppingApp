import { SharedService } from 'src/app/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  private userStatusSubscribtion = new Subscription()
  
  constructor( private sharedService: SharedService,
    private authService: AuthService,
    private router:Router) { }

  async ngOnInit(): Promise<void> {
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      if(data == false){
        this.router.navigate(['/home/deals'])
      }
    });
  }

  onClickAddress(){
      this.sharedService.clickAddress();
  }

  onClickOrders(){
    this.sharedService.clickOrder();
}

}
