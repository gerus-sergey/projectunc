import { Component, OnInit } from '@angular/core';
import {User} from "./user.interface";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../profile/profile.component.css']
})
export class UserComponent implements OnInit {

  public user: User;

  private id: number;
  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute){

    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }
  ngOnDestroy(){
    this.routeSubscription.unsubscribe();
  }
  
  ngOnInit() {
    this.user = {
      lastname:"Petrov",
      firstname:"Petr",
      dateOfBirth:"12.12.1212",
      sex:"M",
      info:"ballbalalblabllab",
      city:"Vorkuta"
    }
  }

}
