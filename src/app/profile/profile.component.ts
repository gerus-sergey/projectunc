import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";
import {Response} from "@angular/http";
import {City} from "../models/city.interface";
import {State} from "../models/state.interface";
import {Country} from "../models/country.interface";
import {Gender} from "../models/gender.interface";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HttpService]
})
export class ProfileComponent implements OnInit,OnDestroy {

  public userProfile:User;
  private id:number;
  private routeSubscription:Subscription;

  constructor(private route:ActivatedRoute, private httpService:HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  gender: Gender;
  country: Country;
  state: State;
  city: City;
  ngOnInit() {
    this.userProfile = {
      lastName: "",
      firstName: "",
      birthday: "",
      gender:this.gender,
      info: "",
      city: this.city,
      country: this.country,
      state: this.state
    }
    this.httpService.getUser(this.id)
      .subscribe((resp:Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
      });
  }

}
