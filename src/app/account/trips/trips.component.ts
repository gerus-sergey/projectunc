import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {Response} from "@angular/http";
import {HttpService} from "../../services/http.service";
import {Trip} from "../../models/trips.interface";
import {Router} from '@angular/router';


@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    styleUrls: ['./trips.component.scss'],
    providers: [HttpService]
})
export class TripsComponent implements OnInit, OnDestroy {

    profileTripsActive:Trip[] = [];
    profileTripsComplited:Trip[] = [];
    public id:number;
    private routeSubscription:Subscription;
    private trip: Trip;

    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnInit() {
        this.httpService.getTravelsToUser(this.route.parent.snapshot.params["id"])
            .subscribe((resp:Response) => {
                let tripList = resp.json();
                for (let index in tripList) {
                    //console.log(tripList[index]);
                    let trip = tripList[index];
                    if (trip.active)
                        this.profileTripsActive.push(trip);
                    else
                        this.profileTripsComplited.push(trip);
                }
            });
    }

    deleteTrip(id:number) {
        this.httpService.deleteTrip(id)
            .subscribe((data) => {
                for(var i = 0; i < this.profileTripsActive.length; i++){
                    if(this.profileTripsActive[i].id == id){
                        this.profileTripsActive.splice(i, 1);
                    }
                }
                for(var i = 0; i < this.profileTripsComplited.length; i++){
                    if(this.profileTripsComplited[i].id == id){
                        this.profileTripsComplited.splice(i, 1);
                    }
                }
            });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

}
