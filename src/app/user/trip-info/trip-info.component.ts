import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../../services/trip.service";
import {Http} from "@angular/http";
import {Day} from "../../models/day.interface";
import {Trip} from "../../models/trips.interface";
import {Transport} from "../../models/transport.interface";
import {Subscription} from "rxjs/Subscription";
import {Activities} from "../../models/activities.interface";
import {Movement} from "../../models/movements.interface";
import {NgForm} from "@angular/forms";
import {ActivityType} from "../../models/activityType.interface";
import {Coordinates} from "../../models/coordinates.interface";

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.scss']
})
export class TripInfoComponent implements OnInit {
  private days: Day[];
  private subOne: any;
  private tripId: number;
  private pathToPhoto: string;
  private trip: Trip;
  private routeSubscription: Subscription;
  private flagOne: boolean;
  private subTwo:any;
  private subThree:any;
  private selectedDay: Day;
  private visible: boolean;
  private visible2: boolean;
  private activity: Activities[];
  private movement: Movement[];


  ngOnInit() {
    this.trip = {
      id: null,
      photo: '',
      name: '',
      startDate: null,
      endDate: null,
      info: '',
      active: false,
      days: [null],
      activities: [null],
      movements: [null],
      participants: [null],
      countries:[null],
      album:null,
  }


    this.days = [new Day(1, new Date(), [])];
      this.tripService.addReadyTrip(this.tripId);
      this.tripService.addRole(this.tripId);
      this.pathToPhoto = this.trip.photo;

      this.tripService.trip$.subscribe(
          trip => {
            this.trip = trip;
          });
    }

  constructor(private route:ActivatedRoute, private tripService:TripService) {
    this.routeSubscription = route.params.subscribe(params=>this.tripId = params['id']);


    tripService.path$.subscribe(
        path => {

          this.pathToPhoto = path;

        });

    this.subOne = tripService.nameDay$.subscribe(
        nameDay => {
          this.days = nameDay;
          this.flagOne = false;
        });

    this.subTwo = tripService.activity$.subscribe(
        activity => {
          this.tripService.setActivities(activity);
          if (new Date(activity.startTime).getDate() + new Date(activity.startTime).getMonth() ==
              this.selectedDay.name.getDate() + this.selectedDay.name.getMonth()) {
            this.selectedDay.action.push(activity);
            this.selectedDay.action.sort(function (a, b) {
              return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
            });
          }
        });

    this.subThree = tripService.movement$.subscribe(
        movement => {
          this.tripService.setMovement(movement);
          if (new Date(movement.startTime).getDate() + new Date(movement.startTime).getMonth() ==
              this.selectedDay.name.getDate() + this.selectedDay.name.getMonth()) {
            this.selectedDay.action.push(movement);
            //console.log(this.tripService.getTrip());
          }
          this.selectedDay.action.sort(function (a, b) {
            return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
          });
        });
  }

  addOrUpdateTrip(model:Trip, isValid:boolean) {
    if (isValid) {
      this.days = [];
      if (this.tripId == 0) {
        this.trip.active = true;
        if (model.endDate != null) {
          var i = 1;
          this.days.push(new Day(i, new Date(this.trip.startDate), []));
          while (this.days[this.days.length - 1].name < new Date(model.endDate)) {
            i++;
            this.days.push(new Day(i, new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
          }
          this.trip.days = this.days;
          this.trip.activities = [];
          this.trip.movements = [];
          this.tripService.addTrip(this.trip);
          this.tripService.setNameDay(this.days);
          this.tripService.addOrUpdateTrip(this.trip);
          console.log(this.trip);
        } else {
          this.trip.days[0] = new Day(1, new Date(this.trip.startDate), []);
          this.days.push(new Day(1, new Date(this.trip.startDate), []));
          this.trip.days = this.days;
          this.trip.activities = [];
          this.trip.movements = [];
          this.tripService.addTrip(this.trip);
          this.tripService.setNameDay(this.days);
          this.tripService.addOrUpdateTrip(this.trip);
        }
      }
      else {
        this.tripService.addOrUpdateTrip(this.trip);
        var i = 1;
        this.days.push(new Day(i, new Date(this.trip.startDate), []));
        while (this.days[this.days.length - 1].name < new Date(this.trip.endDate)) {
          i++;
          this.days.push(new Day(i, new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
        }
        this.trip.days = this.days;
        this.tripService.setNameDay(this.days);
      }
    }
  }

  setVisible() {
    this.visible = true;
    this.visible2 = false;
  }

  setVisible2() {
    this.visible = false;
    this.visible2 = true;
  }

  onSelect(day:Day):void {
    this.selectedDay = day;
    this.selectedDay.action = [];
    this.activity = this.tripService.getActivities();
    this.movement = this.tripService.getMovements();

    for (var i = 0; i < this.activity.length; i++) {
      if (new Date(this.activity[i].startTime).getDate() + new Date(this.activity[i].startTime).getMonth() ==
          this.selectedDay.name.getDate() + this.selectedDay.name.getMonth()) {
        this.selectedDay.action.push(this.activity[i]);
      }
    }
    for (var i = 0; i < this.movement.length; i++) {
      if (new Date(this.movement[i].startTime).getDate() + new Date(this.movement[i].startTime).getMonth() ==
          this.selectedDay.name.getDate() + this.selectedDay.name.getMonth()) {
        this.selectedDay.action.push(this.movement[i]);
      }
    }
    this.selectedDay.action.sort(function (a, b) {
      return (a.startTime.valueOf() + 24 * 60 * 60 * 1000) - (b.startTime.valueOf() + 24 * 60 * 60 * 1000);
    });
  }

  isMovement(variable) {
    //console.log(variable, variable instanceof Movement);
    return variable instanceof Movement;
  }

  isActivity(variable) {
    //console.log(variable, variable instanceof Activities);
    return variable instanceof Activities;
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.subOne.unsubscribe();
    this.subTwo.unsubscribe();
    this.subThree.unsubscribe();
  }

}
