import {Component, OnInit, Input} from '@angular/core';


import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {User} from "../../models/user.interface";
import {HttpService} from "../../services/http.service";

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['../../account/profile/profile-account/profile-account.component.css'],
    providers: [HttpService]
})
export class UserAccountComponent implements OnInit {
    public userAccount:User;
    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute,private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    ngOnInit() {
        this.httpService.getUser(this.route.parent.snapshot.params["id"])
            .subscribe((resp:Response) => {
                let user = resp.json();
                if (user)
                    this.userAccount = user;
            });
    }
}
