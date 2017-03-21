import { Component, OnInit } from '@angular/core';
import {UserSignIn} from "./user.sign-in.interface";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public userSignIn: UserSignIn;
  constructor() { }

  ngOnInit() {
    this.userSignIn = {
      email:'',
      password:''
    }
  }

}
