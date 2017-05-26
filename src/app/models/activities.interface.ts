import {Trip} from "./trips.interface";
import {Coordinates} from "./coordinates.interface";
import {ActivityType} from "./activityType.interface";
/**
 * Created by Сергей on 04.05.2017.
 */
export class Activities {


    constructor(id:number, travel:Trip, name:string, address:string, description:string, price:number, ticket:string, coordinates:Coordinates, startTime:Date, endTime:Date, activityType:ActivityType) {
        this.id = id;
        this.travel = travel;
        this.name = name;
        this.address = address;
        this.description = description;
        this.price = price;
        this.ticket = ticket;
        this.coordinates = coordinates;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activityType = activityType;
    }

    id:number;
    travel:Trip;
    name:string;
    address:string;
    description:string;
    price:number;
    ticket:string;
    coordinates:Coordinates;
    startTime:Date;
    endTime:Date;
    activityType: ActivityType;
}