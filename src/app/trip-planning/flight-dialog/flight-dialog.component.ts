import {Component, OnInit} from '@angular/core';
import {Movement} from "../../models/movements.interface";
import {TripService} from "../../services/trip.service";
import {Transport} from "../../models/transport.interface";
import {Coordinates} from "../../models/coordinates.interface";

@Component({
    selector: 'app-flight-dialog',
    templateUrl: './flight-dialog.component.html',
    styleUrls: ['./flight-dialog.component.css']
})
export class FlightDialogComponent implements OnInit {
    flight:Movement;

    constructor(private tripService:TripService) {
    }

    ngOnInit() {
        this.flight = {
            id: null,
            transport: null,
            travel: null,
            startTime: null,
            endTime: null,
            startAddress: '',
            destinationAddress: '',
            price: null,
            distance: null,
            description: '',
            ticket: '',
            start_coordinates:null,
            destination_coordinates:null
        }
    }

    addFlight(model:Movement) {
        model.transport = new Transport(1, "plane");
        console.log(model);
        this.tripService.setMovementSubject(new Movement(model.id, model.transport, model.travel, new Date(model.startTime), new Date(model.endTime),
            model.startAddress, model.destinationAddress, model.price, model.distance, model.description, model.ticket, new Coordinates("point", 0.0 , 0.0), new Coordinates("point", 0 , 0)));
        this.flight = {
            id: null,
            transport: null,
            travel: null,
            startTime: null,
            endTime: null,
            startAddress: '',
            destinationAddress: '',
            price: null,
            distance: null,
            description: '',
            ticket: '',
            start_coordinates:null,
            destination_coordinates:null
        }
    }
}
