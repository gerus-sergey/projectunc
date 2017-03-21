import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../profile/user-profile.interface";


@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.css']
})
export class ProfileAccountComponent implements OnInit {
  public userProfile:UserProfile;
  constructor() { }

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
