import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";
import {Subscription} from "rxjs/Subscription";
import {Gender} from "../models/gender.interface";
import {Country} from "../models/country.interface";
import {City} from "../models/city.interface";
import {State} from "../models/state.interface";
import {Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css'],
  providers: [HttpService]
})
export class ProfileAccountComponent implements OnInit {
  public userProfile:User;
  private id:number;
  private routeSubscription:Subscription;

  constructor(private route:ActivatedRoute,private httpService:HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  gender: Gender ;
  country: Country ;
  state: State;
  city: City;
  ngOnInit() {
    this.userProfile = {
      lastName: "",
      firstName: "",
      birthday: "",
      gender:this.gender,
      info: "",
      city:this.city,
      country: this.country,
      state: this.state
    }
    this.httpService.getUser(this.route.parent.snapshot.params["id"])
      .subscribe((resp:Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
        console.log(this.userProfile);
      });
  }

}
