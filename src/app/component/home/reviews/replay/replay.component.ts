import { IReplay } from './../../../../models/review';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ReviewsService } from 'src/app/service/reviews.service';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {

  @Input() reviewId!:number;
  @Output() replayId!:number;
  replays!:IReplay[];

  constructor( private reviewsService: ReviewsService,) { }

  async ngOnInit(): Promise<void> {
    this.replays = await this.reviewsService.getReplay(this.reviewId).toPromise();
  }

}
