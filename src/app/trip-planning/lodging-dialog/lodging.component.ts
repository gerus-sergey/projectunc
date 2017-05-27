import {Component, OnInit} from '@angular/core';
import {Activities} from "../../models/activities.interface";
import {TripService} from "../../services/trip.service";
import {Coordinates} from "../../models/coordinates.interface";
import {ActivityType} from "../../models/activityType.interface";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
@Component({
    selector: 'app-lodging',
    templateUrl: './lodging.component.html',
    styleUrls: ['./lodging.component.css']
})
export class LodgingComponent implements OnInit {
    private tripId:number;
    lodging:Activities;
    private routeSubscription:Subscription;
    constructor(private route:ActivatedRoute,private _location:Location,private tripService:TripService) {
        this.routeSubscription = route.parent.params.subscribe(params=>this.tripId = params['id']);
    }

    ngOnInit() {
        this.lodging = {
            id: null,
            travel: null,
            name: '',
            address: '',
            description: '',
            price: null,
            ticket: '',
            coordinates: null,
            startTime: null,
            endTime: null,
            activityType:null
        }
    }

    addLodging(model:Activities, isValid:boolean) {
        if (isValid) {
            this.tripService.setActivitySubject(new Activities(model.id, model.travel, model.name,
                model.address, model.description, model.price, model.ticket, new Coordinates("point", 0.0 , 0.0),
                new Date(model.startTime), new Date(model.endTime), new ActivityType(1 , 'lodging')));
            this.lodging = {
                id: null,
                travel: null,
                name: '',
                address: '',
                description: '',
                price: null,
                ticket: '',
                coordinates: null,
                startTime: null,
                endTime: null,
                activityType:null
            }
        }
    }

    backClick() {
        this._location.go("/trip-planning/" + this.tripId);
    }
    
}
