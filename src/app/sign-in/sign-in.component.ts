import {Component, OnInit} from '@angular/core';
import {UserSignIn} from "./user.sign-in.interface";
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";
import {UserRegistered} from "../models/user-registered.interface";
import {LocalStorageService} from 'angular-2-local-storage';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';
import {Subject} from "rxjs/Subject";


@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    userSignIn:UserSignIn;
    receivedUser:UserRegistered;
    signInSuccess:boolean;

    constructor(private route:Router, private httpService:HttpService, private localStorageService:LocalStorageService) {
    }

    ngOnInit() {
        this.userSignIn = {
            email: '',
            password: ''
        };
    }

    done:boolean = false;

    signInUser(model:UserSignIn, isValid:boolean) {
        if (isValid) {
            this.httpService.signInUser(model)
                .catch((error:any) => {
                    confirm("Entered incorrect password or email");
                    return Observable.throw(error);
                })
                .subscribe((data) => {
                    this.receivedUser = data;
                    this.done = true;
                    this.route.navigateByUrl("/account/" + this.receivedUser.id + "/profile");
                    localStorage.setItem('id', this.receivedUser.id.toString());
                    this.httpService.setId(this.receivedUser.id);
                });
        }
    }

}
