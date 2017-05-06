import {Injectable} from '@angular/core';
import {Trip} from "../models/trips.interface";
import {Subject} from "rxjs/Subject";
import {Day} from "../models/day.interface";
import {Activities} from "../models/activities.interface";
/**
 * Created by Сергей on 30.04.2017.
 */
@Injectable()
export class TripService {

    private trip:Trip;



    private nameDaySource = new Subject<any>();
    nameDay$ = this.nameDaySource.asObservable();

    setNameDay(nameDay:any) {
        console.log(nameDay);
        this.nameDaySource.next(nameDay);
    }

    addTrip(addTrip:Trip) {
        this.trip = addTrip;
        console.log(this.trip);
    }

    getTrip():Trip {
        return this.trip;
    }

    getDays(id:number){
        if(id == 0){
            this.trip.days = [new Day(1, new Date(),[])];
        }else{
            //обращение к серверу
        }
    }

    addDay(id:number, addDay:Date) {
        this.trip.days.push(new Day(id, new Date(addDay),[]));
        console.log(this.trip);
    }

    getDay(id:number) {
        return this.trip.days[id];
    }
    setActivities(idDay:number, activity: Activities){
        this.trip.days[idDay].activities.push(activity);
    }
    getActivities(idDay:number){
       return this.trip.days[idDay].activities;
    }

}