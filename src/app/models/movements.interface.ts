import {Trip} from "./trips.interface";
import {Transport} from "./transport.interface";
import {Coordinates} from "./coordinates.interface";

/**
 * Created by Сергей on 11.05.2017.
 */
export class Movement{


    constructor(id:number, transport:Transport, travel:Trip, startTime:Date, endTime:Date, startAddress:string, destinationAddress:string, price:number, distance:number, description:string, ticket:string, start_coordinates:Coordinates, destination_coordinates:Coordinates) {
        this.id = id;
        this.transport = transport;
        this.travel = travel;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startAddress = startAddress;
        this.destinationAddress = destinationAddress;
        this.price = price;
        this.distance = distance;
        this.description = description;
        this.ticket = ticket;
        this.start_coordinates = start_coordinates;
        this.destination_coordinates = destination_coordinates;
    }

    id:number;
    transport:Transport;
    travel:Trip;
    startTime:Date;
    endTime:Date;
    startAddress:string;
    destinationAddress:string;
    price:number;
    distance:number;
    description:string;
    ticket:string;
    start_coordinates: Coordinates;
    destination_coordinates: Coordinates;
}