import {Component, OnInit} from '@angular/core';
import {Activities} from "../../models/activities.interface";
import {TripService} from "../../services/trip.service";
import {Coordinates} from "../../models/coordinates.interface";
import {ActivityType} from "../../models/activityType.interface";

@Component({
    selector: 'app-lodging',
    templateUrl: './lodging.component.html',
    styleUrls: ['./lodging.component.css']
})
export class LodgingComponent implements OnInit {
    
    lodging:Activities;
    
    constructor(private tripService:TripService) {
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
    
}
