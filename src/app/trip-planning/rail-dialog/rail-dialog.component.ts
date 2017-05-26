import { Component, OnInit } from '@angular/core';
import {Movement} from "../../models/movements.interface";
import {Transport} from "../../models/transport.interface";
import {TripService} from "../../services/trip.service";
import {Coordinates} from "../../models/coordinates.interface";

@Component({
  selector: 'app-rail-dialog',
  templateUrl: './rail-dialog.component.html',
  styleUrls: ['./rail-dialog.component.css']
})
export class RailDialogComponent implements OnInit {

  rail: Movement;
  constructor(private tripService:TripService) { }

  ngOnInit() {
    this.rail = {
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

  addRail(model:Movement){
    model.transport = new Transport(2, "rail");
    this.tripService.setMovementSubject(new Movement(model.id, model.transport, model.travel, new Date(model.startTime), new Date(model.endTime),
        model.startAddress, model.destinationAddress, model.price, model.distance, model.description, model.ticket, new Coordinates("point", 0 , 0), new Coordinates("point", 0 , 0)));
    this.rail = {
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
