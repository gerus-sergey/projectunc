import { Component, OnInit } from '@angular/core';
import {UserNewPassword} from "../../../models/user-newpassword.interface";



@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {
  public userPassword:UserNewPassword;
  constructor() {
  }

  ngOnInit() {
    this.userPassword = {
      oldPassword:'',
      password:'',
      confirmPassword:''
    }
  }

}
