import {Component, OnInit, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../../services/trip.service";
import {Day} from "../../models/day.interface";
import {Activities} from "../../models/activities.interface";

@Component({
    selector: 'app-trip-day-field',
    templateUrl: './trip-day-field.component.html',
    styleUrls: ['./trip-day-field.component.css'],
    providers: [HttpService]
})
export class TripDayFieldComponent implements OnInit, OnDestroy {

    private tripPlanId:number = this.route.parent.snapshot.params["id"];
    private id:number;
    activities:Activities[] = [];
    tripDay:Day;
    condition:boolean = false;
    private routeSubscription:Subscription;

    ngOnInit() {
        this.tripDay = this.tripService.getDay(this.id - 1);
        this.tripDay.activities.push(new Activities(1, "qwe", new Date("2017-12-12 12:30"), new Date("2017-12-12 12:40")));
        this.tripDay.activities.push(new Activities(2, "eqw", new Date("2017-12-12 05:05"), new Date("2017-12-12 12:30")));
        this.tripDay.activities.push(new Activities(3, "asd", new Date("2017-12-12 13:00"), new Date("2017-12-12 16:00")));
        console.log(this.tripService.getTrip());
        
    }
    
    sortActivities(start_time:number){
        this.activities = [];
        for (var i =0 ; i < this.tripDay.activities.length; i++){
            if(this.tripDay.activities[i].start_time.getHours() == start_time){
                this.activities.push(this.tripDay.activities[i])
            }
        }
        console.log(this.activities);
        return this.activities;
    }
    
    constructor(private _location:Location, private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    backClick() {
        this._location.go("/trip-planning/" + this.tripPlanId + "/day/" + this.id);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }


}
