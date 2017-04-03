import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.interface";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {HttpService} from "../services/http.service";
import {Response} from "@angular/http";
import {Gender} from "../models/gender.interface";
import {City} from "../models/city.interface";
import {State} from "../models/state.interface";
import {Country} from "../models/country.interface";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['../profile/profile.component.css'],
    providers: [HttpService]
})
export class UserComponent implements OnInit {
    public user:User;
    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
  gender: Gender ;
  country: Country ;
  state: State ;
  city: City ;
    ngOnInit() {
        this.user = {
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
                    this.user = user;
            });
    }

}
