import {Component, OnInit} from '@angular/core';
import {HttpService} from "../services/http.service";
import {UserRegistered} from "../models/user-registered.interface";
import 'rxjs/add/operator/toPromise'
import {Router} from "@angular/router";
import {Gender} from "../models/gender.interface";
import {City} from "../models/city.interface";
import {Country} from "../models/country.interface";
import {Response} from "@angular/http";
import { LocalStorageService } from 'angular-2-local-storage';
import {State} from "../models/state.interface";

export class Form{
  id: number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  confirmPassword:string;
  gender:string;
  country:string;
  state:string;
  city:string;
}

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
  providers: [HttpService]
})
export class RegisteredComponent implements OnInit {

  userRegistered:UserRegistered;
  receivedUser:UserRegistered; // полученный пользователь
  listCities: Country[]=[];
  listStateOfTheCountry: State[]=[];
  listCityesOfTheState: City[]=[];
  form:Form = new Form();
  remember:boolean = false;

  constructor(private route:Router, private httpService:HttpService,private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.form = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      country:'',
      state:'',
      city: ''
    }

    console.log(localStorage.getItem('id'));

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

  done:boolean = false;
  freeEmail:boolean = true;

  setCountryId(idCountry:string){
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

  checkEmail(isValid:boolean) {
    if (isValid) {
      this.httpService.checkEmail(this.form.email)
        .subscribe((data) => {
            this.freeEmail = false;
          },
          error => this.freeEmail = true
        )
    }
  }


  addOrUpdateUser(model:Form, isValid:boolean) {
    if (isValid) {
      this.userRegistered = new UserRegistered(null, model.firstName, model.lastName, model.email, model.password, new Gender(model.gender,""), new City(model.city,""));

      this.httpService.addUser(this.userRegistered)
        .subscribe((data) => {
         this.receivedUser = data;
          this.done = true;
          console.log( this.receivedUser);
          this.route.navigateByUrl("/account/" + this.receivedUser.id + "/profile/account");
          if(this.remember) {
            localStorage.setItem('id', this.receivedUser.id.toString());
          }else{
            localStorage.setItem('id', null);
          }
        });

      console.log( this.userRegistered);
    }
  }
}
