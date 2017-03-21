import { Component, OnInit } from '@angular/core';
import {User} from "../user/user.interface";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['../profile-account/profile-account.component.css']
})
export class UserAccountComponent implements OnInit {

  public user: User;


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
