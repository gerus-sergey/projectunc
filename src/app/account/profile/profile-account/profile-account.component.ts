import { Component, OnInit,OnDestroy } from '@angular/core';
import {Response} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user.interface";
import {HttpService} from "../../../services/http.service";
import {City} from "../../../models/city.interface";
import {Gender} from "../../../models/gender.interface";
import {Router} from "@angular/router";
import {Country} from "../../../models/country.interface";
import {State} from "../../../models/state.interface";

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css'],
  providers: [HttpService]
})
export class ProfileAccountComponent implements OnInit {
  userProfile: User;
  updateProfile : User;
  listCities: Country[]=[];
  listStateOfTheCountry: State[]=[];
  listCityesOfTheState: City[]=[];

  constructor(private route:ActivatedRoute,private httpService:HttpService,private router:Router) {
  }

  ngOnInit() {
    this.httpService.getUser(this.route.parent.parent.snapshot.params["id"])
      .subscribe((resp:Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
        //console.log(this.userProfile);
      });

    this.httpService.getCountries()
      .subscribe((resp: Response) => {
        let cityList = resp.json();
        for(let index in cityList){
          let city = cityList[index];
          this.listCities.push(city);
        }
        //console.log(this.listCities);
      });
  }

  setCountryId(idCountry:string){
    this.listStateOfTheCountry = [];
    this.listCityesOfTheState = [];
    this.httpService.getStatesOfTheCountry(idCountry)
      .subscribe((resp: Response) => {
        let stateList = resp.json();
        for(let index in stateList){
          let state = stateList[index];
          this.listStateOfTheCountry.push(state);
        }
        //console.log(this.listCities);
      });
  }

  setStateId(idState:string){
   // console.log(idState);
    this.listCityesOfTheState = [];
    this.httpService.getCitiesOfTheState(idState)
      .subscribe((resp: Response) => {
        let citiesList = resp.json();
        for(let index in citiesList){
          let city = citiesList[index];
          this.listCityesOfTheState.push(city);
        }
        // console.log(this.listCities);
      });
  }

  updateUser(model:User, isValid:boolean){
    console.log(model);
    this.updateProfile = new User(this.userProfile.id, model.lastName, model.firstName, model.birthday,
      this.userProfile.email,this.userProfile.password, new Gender(model.gender,""), new City("1", ""), model.info);
    //console.log(this.updateProfile);

    // this.httpService.updateUser(this.updateProfile)
    //   .subscribe((data) => {
    //     this.userProfile = data;
    //     this.router.navigateByUrl("/account/" + this.userProfile.id + "/profile/account");
    //   });
  }

}
