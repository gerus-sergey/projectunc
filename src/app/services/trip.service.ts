import {Injectable} from '@angular/core';
import {Trip} from "../models/trips.interface";
import {Subject} from "rxjs/Subject";
import {Day} from "../models/day.interface";
import {Activities} from "../models/activities.interface";
import {Movement} from "../models/movements.interface";
import {HttpService} from "./http.service";
import {Participant} from "../models/participant.interface";
import {LocalStorageService} from 'angular-2-local-storage';
import {Sight} from "../models/sight";
import {Album} from "../models/album.interface";

/**
 * Created by Сергей on 30.04.2017.
 */
@Injectable()
export class TripService {

    trip:Trip;
    idTrip:number
    role:number;
    idUser:number = parseInt(localStorage.getItem('id'));

    constructor(private httpService:HttpService, private localStorageService:LocalStorageService) {
    }

    addTrip(addTrip:Trip) {
        this.trip = addTrip;
    }

    addReadyTrip(idTrip:number) {
        this.idTrip = idTrip;
        this.httpService.getTrip(idTrip)
            .subscribe((data) => {
                this.trip = data;
                this.trip.startDate = new Date(data.startDate);
                this.trip.endDate = new Date(data.endDate);
                console.log(this.trip);
                this.setPath(this.trip.photo);
                var i = 1;
                this.trip.days = [];
                this.trip.activities = [];
                this.trip.movements = [];

                this.trip.days.push(new Day(i, new Date(this.trip.startDate), []));
                while (this.trip.days[this.trip.days.length - 1].name < new Date(this.trip.endDate)) {
                    i++;
                    this.trip.days.push(new Day(i, new Date(this.trip.days[this.trip.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
                }

                this.httpService.getActivitiesToTrip(idTrip)
                    .subscribe((data) => {
                        for (let index in data) {
                            let activity = data[index];
                            this.trip.activities.push(new Activities(activity.id, activity.travel, activity.name, activity.address,
                                activity.description, activity.price, activity.ticket, activity.coordinates, new Date(activity.startTime),
                                new Date(activity.endTime), activity.activityType));
                        }
                    });
                
                this.httpService.getAlbumsByTravelID(idTrip)
                    .subscribe((data) =>{
                        this.trip.album = data;
                        console.log(this.trip.album);
                    });
                
                this.httpService.getMovementToTrip(idTrip)
                    .subscribe((data) => {
                        for (let index in data) {
                            let movement = data[index];
                            //console.log(movement);
                            this.trip.movements.push(new Movement(movement.id, movement.transport, movement.travel, new Date(movement.startTime),
                                new Date(movement.endTime), movement.startAddress, movement.destinationAddress, movement.price, movement.distance,
                                movement.description, movement.ticket, movement.start_coordinates, movement.destination_coordinates));
                        }
                    });

                this.httpService.getParticipantsToTrip(idTrip)
                    .subscribe((data) => {
                        this.trip.participants = data;
                        this.setParticipant(this.trip.participants);
                    });

                this.setNameDay(this.trip.days);
                this.setTrip(this.trip);
            });
    }

    addRole(idTrip:number) {
        this.httpService.getRoleInTrip(this.idUser, idTrip)
            .subscribe((data) => {
                console.log("idUser: " + this.idUser + "idTrip: " + idTrip + "role" + data.role.id);
                this.setRole(data.role.id);
            });
    }


    addOrUpdateTrip(trip:Trip) {
        this.httpService.addOrUpdateTrip(trip, this.idUser)
            .subscribe((data) => {
                this.trip.id = data.id;
                console.log( data);
                console.log(this.trip);
                this.httpService.addAlbum(new Album(null, this.trip.name, this.trip.startDate, "album for " + this.trip.name, this.trip))
                    .subscribe((data) => {
                        this.trip.album = data;
                        console.log(this.trip);
                    })
            });
    }

    

    getTrip():Trip {
        return this.trip;
    }

    getRole(){
        return this.role;
    }

    
    
    private pathSubject = new Subject<string>();
    path$ = this.pathSubject.asObservable();

    setPath(path: string) {
        this.pathSubject.next(path);
    }

    private mapSubject = new Subject<Activities>();
    sight$ = this.mapSubject.asObservable();

    setMap(activity: Activities) {
        this.mapSubject.next(activity);
    }


    private roleSubject = new Subject<number>();
    role$ = this.roleSubject.asObservable();

    setRole(role:number) {
        this.roleSubject.next(role);
        this.role = role;
    }

    private tripSubject = new Subject<Trip>();
    trip$ = this.tripSubject.asObservable();

    setTrip(trip:Trip) {
        this.tripSubject.next(trip);
    }

    private nameDaySource = new Subject<Day[]>();
    nameDay$ = this.nameDaySource.asObservable();

    setNameDay(nameDay:Day[]) {
        this.nameDaySource.next(nameDay);
    }

    private participantSubject = new Subject<Participant[]>();
    participant$ = this.participantSubject.asObservable();

    setParticipant(participant:Participant[]) {
        this.participantSubject.next(participant);
    }

    private activitiesSubject = new Subject<Activities>();
    activity$ = this.activitiesSubject.asObservable();

    setActivitySubject(activity:Activities) {
        this.activitiesSubject.next(activity);
    }

    private movementsSubject = new Subject<Movement>();
    movement$ = this.movementsSubject.asObservable();

    setMovementSubject(movement:Movement) {
        this.movementsSubject.next(movement);
    }


    getDays() {
        return this.trip.days;
    }

    addDay(addDay:Day) {
        //this.trip.days.push(addDay);
        console.log(this.trip);
    }

    getDay(id:number) {
        console.log(id);
        return this.trip.days[id];
    }

    setActivities(activity:Activities) {
        console.log(activity);
        this.httpService.addActivity(activity, this.trip.id)
            .subscribe((data) => {
                console.log(data);
            });
        this.trip.activities.push(activity);
    }

    getActivities() {
        return this.trip.activities;
    }

    setMovement(movement:Movement) {

        console.log(movement);
        this.httpService.addMovement(movement, this.trip.id)
            .subscribe((data) => {
                console.log(data);
            });
        this.trip.movements.push(movement);
        //console.log(this.trip);
    }

    getMovements() {
        return this.trip.movements;
    }

}