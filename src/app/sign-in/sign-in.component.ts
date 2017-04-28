import {Component, OnInit} from '@angular/core';
import {UserSignIn} from "./user.sign-in.interface";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {UserRegistered} from "../models/user-registered.interface";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [HttpService]
})
export class SignInComponent implements OnInit {
  userSignIn:UserSignIn;
  receivedUser:UserRegistered;

  constructor(private route:Router, private httpService:HttpService,private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.userSignIn = {
      email: '',
      password: ''
    }
    //localStorage.setItem('id','3');
    //localStorage.getItem('id');
    
  }

  done:boolean = false;

  signInUser(model:UserSignIn, isValid:boolean) {
    if (isValid) {
      this.httpService.signInUser(model)
        .subscribe((data) => {
          this.receivedUser = data;
          this.done = true;
          this.route.navigateByUrl("/account/" + this.receivedUser.id + "/profile/account");
            localStorage.setItem('id', this.receivedUser.id.toString());
            console.log(localStorage.getItem('id'));
        });
    }
  }

}
