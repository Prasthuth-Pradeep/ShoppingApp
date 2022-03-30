import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IReview, IReplay } from './../../../models/review';
import { ReviewsService } from './../../../service/reviews.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  @Input() product!: number;
  reviews!: IReview[];
  replays!: IReplay[];
  reviewForm: FormGroup;
  replayForm: FormGroup;
  userId: any;
  userStatus!: boolean;
  showReplay: boolean = false;
  showReplayId!: number;
  addReplay: boolean = false;
  private userStatusSubscribtion = new Subscription();
  private userSubscribtion = new Subscription();
  private reviewDisplaySubscribtion = new Subscription();

  constructor(private reviewsService: ReviewsService,
    private authService: AuthService,
    private reviewFormBuilder: FormBuilder,
    private replayFormBuilder: FormBuilder,
    private router: Router) {

    this.reviewForm = this.reviewFormBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]]
    })

    this.replayForm = this.replayFormBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(600)]]
    })
  }

  async ngOnInit(): Promise<void> {

    this.reviewDisplaySubscribtion = this.reviewsService.refreshNotification.subscribe(() => {
      this.getAllReviews()
    })
    this.userStatusSubscribtion = this.authService.isUserStatus().subscribe((data) => {
      this.userStatus = data;
    });
    this.userSubscribtion = this.authService.isUserId().subscribe((data) => {
      this.userId = data;
    });
    
    this.getAllReviews();
  }

  getAllReviews(){
    this.reviewsService.getReview(this.product).subscribe((data) => {
      this.reviews = data;
    });
  }

  onAddReview(data: string) {
    if (this.reviewForm.valid && this.userStatus === true) {
      const newData: any = {
        userId: this.userId,
        productId: this.product,
        data: data
      }
      this.reviewsService.postReview(newData).subscribe((data) => {
        console.log(data);
      })
      this.reviewForm.reset();
    } 
    if(this.userStatus === false){
      this.router.navigate(['/sign-in']);
    }
  }

  onAddReplay(id: number, data: string) {
    if (this.replayForm.valid  && this.userStatus === true) {
      const replayData: any = {
        userId: this.userId,
        reviewId: id,
        content: data
      }
    }
    this.addReplay = false;
  }

  onClickShowReplays(reviewId: number) {
    // this.showReplay = true;
    // this.showReplayId = reviewId; 
  }

  onClickHideReplays() {
    this.showReplay = false;
  }

  onClickAddReplay() {
    this.addReplay = true;
  }

  
  ngOnDestroy(): void {
    this.userStatusSubscribtion.unsubscribe();
    this.userSubscribtion.unsubscribe();
    this.reviewDisplaySubscribtion.unsubscribe();
  }
}
