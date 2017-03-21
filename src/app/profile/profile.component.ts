import {Component, OnInit, OnDestroy} from '@angular/core';
import {UserProfile} from "./user-profile.interface";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy  {

   public userProfile: UserProfile;

  private id: number;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute){

    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userProfile = {
      lastname:"Ivanov",
      firstname:"Ivan",
      dateOfBirth:"12.12.1212",
      sex:"M",
      info:"ballbalalblabllab"
    }
  }

}
