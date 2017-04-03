import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {ProfileTrip} from "./profile-trips.interface";
import {Response} from "@angular/http";
import {HttpService} from "../services/http.service";

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    providers: [HttpService]
})
export class TripsComponent implements OnInit,OnDestroy {

    profileTripsActive:ProfileTrip[] = [];
    profileTripsComplited:ProfileTrip[] = [];

    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    ngOnInit() {
        this.httpService.getProfileTrips()
            .subscribe((resp:Response) => {
                let tripList = resp.json();
                for (let index in tripList) {
                    console.log(tripList[index]);
                    let trip = tripList[index];
                    if (trip.active)
                        this.profileTripsActive.push(trip);
                    else
                        this.profileTripsComplited.push(trip);
                }
            });
    }

}
