import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../services/trip.service";
import {Trip} from "../models/trips.interface";
import {Day} from "../models/day.interface";
import {Activities} from "../models/activities.interface";

@Component({
    selector: 'app-trip-planning',
    templateUrl: './trip-planning.component.html',
    styleUrls: ['./trip-planning.component.css'],
    providers: [HttpService]
})
export class TripPlanningComponent implements OnInit, OnDestroy {
    showDialog = false;
    
    public days:Day[];
    public i:number = 1;
    private id:number;
    private routeSubscription:Subscription;

    nameDay:Date = new Date();

    ngOnInit() {
    }

    constructor(private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService) {
        this.days = [new Day(1, new Date(),[])];
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
        tripService.nameDay$.subscribe(
            nameDay => {    
                this.days[0].name = new Date(nameDay);
                this.nameDay = new Date(nameDay);
            });
    }

    addDay() {
        this.i += 1;
        this.nameDay.setDate(this.nameDay.getDate()+1);
        this.days.push({id: this.i, name: this.nameDay, activities:[]});
        this.tripService.addDay(this.i, this.nameDay);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
