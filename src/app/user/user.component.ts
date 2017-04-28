import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../models/user.interface";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {HttpService} from "../services/http.service";
import {Response} from "@angular/http";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['../account/profile/profile.component.css'],
    providers: [HttpService]
})
export class UserComponent implements OnInit, OnDestroy {
    public user:User;
    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
  
    ngOnInit() {
        this.httpService.getUser(this.id)
            .subscribe((resp:Response) => {
                let user = resp.json();
                if (user)
                    this.user = user;
            });
    }

}
