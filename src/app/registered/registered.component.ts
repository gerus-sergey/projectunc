import {Component, OnInit} from '@angular/core';

import {HttpService} from "./http.service";
import {UserRegistered} from "./user-registered.interface";


@Component({
    selector: 'app-registered',
    templateUrl: './registered.component.html',
    styleUrls: ['./registered.component.css'],
    providers: [HttpService]
})
export class RegisteredComponent implements OnInit {
    public userRegistered: UserRegistered;
    receivedUser: UserRegistered; // полученный пользователь
    ngOnInit(){
        this.userRegistered = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            location:'',
            remember:false
        }
    }
    constructor(private httpService: HttpService){}
    done: boolean = false;
    addUser(model: UserRegistered, isValid:boolean){
        if(isValid){
            this.httpService.postData(model)
                .subscribe((data) => {this.receivedUser=data; this.done=true;});
        }
        console.log(model, isValid);
    }
}
