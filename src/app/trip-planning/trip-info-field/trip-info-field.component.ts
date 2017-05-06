import {Component, OnInit,} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Trip} from "../../models/trips.interface";
import {TripService} from "../../services/trip.service";
import {Day} from "../../models/day.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-trip-info-field',
    templateUrl: './trip-info-field.component.html',
    styleUrls: ['./trip-info-field.component.css'],
    providers: [HttpService]
})
export class TripInfoFieldComponent implements OnInit {
    trip:Trip;

    tripPlanId:number = this.route.parent.snapshot.params["id"];

    constructor(private route:ActivatedRoute, private httpService:HttpService, private tripService:TripService) {
    }

    ngOnInit() {
        if (this.tripPlanId == 0) {
            this.trip = {
                id: null,
                img: '',
                name: '',
                startDate: new Date(),
                endDate: new Date(),
                info: '',
                active: false,
                days: [null]
            };
        } else {
            this.httpService.getTrip(this.tripPlanId)
                .subscribe((data) => {
                    this.trip = data;
                    console.log(this.trip);
                });
        }
    }

    addOrUpdateTrip(model:Trip, isValid:boolean) {
        if (this.tripPlanId == 0) {
            this.trip.endDate = new Date("2017-12-12");
            this.trip.active = true;
            this.trip.days[0] = new Day(1, new Date(this.trip.startDate), []);
            this.tripService.addTrip(this.trip);
            this.tripService.setNameDay(model.startDate)
        } else {
            this.httpService.addOrUpdateTrip(this.trip)
                .subscribe((data) => {
                    this.trip = data;
                });
        }
    }

}
