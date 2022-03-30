import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {


  private userStatusSubscribtion = new Subscription()
  
  constructor( private sharedService: SharedService,
    private authService: AuthService,
    private router:Router ) { }

  async ngOnInit(): Promise<void> {
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      if(data == false){
        this.router.navigate(['/home/deals'])
      }
    });

  }
  onUserProfile() {
    this.sharedService.clickUserProfile();
  }

  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
  }

}
