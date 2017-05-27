import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {LocalStorageService} from 'angular-2-local-storage';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {Trip} from "../../models/user-trip.interface";

@Component({
    selector: 'app-invitation-in-trip',
    templateUrl: './invitation-in-trip.component.html',
    styleUrls: ['./invitation-in-trip.component.scss']
})
export class InvitationInTripComponent implements OnInit {
    private routeSubscription:Subscription;
    private trip:Trip;
    private tripId:number;
    private userId:number = parseInt(localStorage.getItem('id'));

    constructor(private route:Router,private router:ActivatedRoute, private localStorageService:LocalStorageService,private httpService:HttpService) {
        this.routeSubscription = router.params.subscribe(params=>this.tripId = params['id']);
    }

    accept() {
        this.httpService.acceptInviteUser(this.userId, this.tripId)
            .subscribe((data) => {
                this.route.navigateByUrl("/trip-planning/" + this.tripId);
            });
    };

    reject() {
        this.route.navigateByUrl("/");
    };

    ngOnInit() {
        this.httpService.getTrip(this.tripId)
            .subscribe((data) => {
                this.trip = data;
                console.log(this.trip);
            });

    }

}
