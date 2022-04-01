import { SharedService } from '../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.scss']
})
export class ShowroomComponent implements OnInit {

  
  homeClass: string = "home-navbar";
  constructor( private sharedService:SharedService) { }

  async ngOnInit(): Promise<void> {
    this.sharedService.sendHomeClassName(this.homeClass);
  }

}
