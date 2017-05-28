import {Component, OnInit, OnDestroy, ElementRef, Input} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {TripService} from "../services/trip.service";
import {Trip} from "../models/trips.interface";
import {Day} from "../models/day.interface";
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
import {Http, Response, Headers} from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
<<<<<<< HEAD
// import {Headers} from "ng2-file-upload/index";
=======
>>>>>>> eeb8872a25a0e951183c8704d0dcf62c4b013107
import {Movement} from "../models/movements.interface";
import {Activities} from "../models/activities.interface";
import {NgForm} from '@angular/forms';
import {ActivityType} from "../models/activityType.interface";
import {Transport} from "../models/transport.interface";
import {Coordinates} from "../models/coordinates.interface";
import {Location} from '@angular/common';
import {Photo} from "../models/photo.interface";
import {User} from "../models/user.interface";
<<<<<<< HEAD
const URL = 'http://localhost:8181/fileUploadPage';
declare var jQuery:any;
=======
>>>>>>> eeb8872a25a0e951183c8704d0dcf62c4b013107

const URL = 'http://localhost:8181/fileUploadPage';
declare var jQuery:any;
@Component({
    selector: 'app-trip-planning',
    templateUrl: './trip-planning.component.html',
    styleUrls: ['./trip-planning.component.css'],
    providers: [HttpService, TripService]
})
export class TripPlanningComponent implements OnInit, OnDestroy {
    date:Date;
    datepickerOpts:any = {
        format: 'd.MM.yyyy'
    };
    public uploader:FileUploader = new FileUploader(
        {
            url: URL
            // headers: <Headers[]> [
            //     {name: 'Content-Type', value: 'multipart/form-data'}
            // ]
            // itemAlias: 'photo'
        });
    private subOne:any;
    private subTwo:any;
    private subThree:any;
    private tripId:number;
    private routeSubscription:Subscription;
    public days:Day[];
    public trip:Trip;
    flagOne:boolean = true;
    flag:boolean = false;
    selectedDay:Day;
    visible:boolean = true;
    visible2:boolean = false;
    activityToDelete:Activities;
    movementToDelete:Movement;
    activity:Activities[] = [];
    movement:Movement[] = [];
    private pathToPhoto:string;
    private photo:Photo;
    private userProfile:User;

    isDisabled() : boolean{
        return this.flagOne;
    }

    handleDateFromChange(dateFrom:Date) {
        // update the model
        this.trip.startDate = dateFrom;

        // do not mutate the object or angular won't detect the changes
        this.datepickerOpts = {
            startDate: dateFrom
        };
    }

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
            countries: [null],
            album: null,

        };

        this.httpService.getUser(parseInt(localStorage.getItem('id')))
            .subscribe((resp:Response) => {
                const user = resp.json();
                if (user)
                    this.userProfile = user;
            });
        this.pathToPhoto = this.trip.photo;
        this.uploader.onAfterAddingFile = (file)=> {
            file.withCredentials = false;
        };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
        this.days = [new Day(1, new Date(), [])];
        if (this.tripId != 0) {
            this.tripService.addReadyTrip(this.tripId);
            this.tripService.addRole(this.tripId);
            this.pathToPhoto = this.trip.photo;

            this.tripService.trip$.subscribe(
                trip => {
                    this.trip = trip;
                });
        }
    }

    constructor(private _location:Location, private httpService:HttpService, private route:ActivatedRoute, private tripService:TripService, private http:Http, private el:ElementRef) {
        this.date = new Date();

        this.routeSubscription = route.params.subscribe(params=>this.tripId = params['id']);

        tripService.role$.subscribe(
            role => {
                console.log(role + "role");
                if (role != 0) {
                    this.flag = true;
                }
            });

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
                //
                this.httpService.addActivity(activity, this.trip.id)
                    .subscribe((data) => {
                        console.log(data);
                        activity.id = data.id;
                    });
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
                this.httpService.addMovement(movement, this.trip.id)
                    .subscribe((data) => {
                        console.log(data);
                        movement.id = data.id;
                    });
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
                    //console.log(this.trip);
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

    backClick() {
        this._location.go("/trip-planning/" + this.tripId);
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

    updateActivity(form:NgForm, id:number, activityTypeId:number) {
        this.tripService.setActivities(new Activities(id, form.value.travel, form.value.name, form.value.address, form.value.description,
            form.value.price, form.value.ticket, new Coordinates('point', 0.0, 0.0), new Date(form.value.startTime), new Date(form.value.endTime),
            new ActivityType(activityTypeId, '')));
    }

    updateMovement(form:NgForm, id:number, transportId:number) {
        console.log(transportId);
        this.tripService.setMovement(new Movement(id, new Transport(transportId, ''), form.value.travel, new Date(form.value.startTime), new Date(form.value.endTime), form.value.startAddress,
            form.value.destinationAddress, form.value.price, form.value.distance, form.value.description, form.value.ticket, new Coordinates('point', 0.0, 0.0), new Coordinates('point', 0.0, 0.0)))
    }

    upload() {
<<<<<<< HEAD
        console.log("dsadsadsadsadsadsadsadsadsadsadsa");
       var csrf_token = jQuery("meta[name='_csrf']").attr("content");
       var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
       //noinspection TypeScriptValidateTypes
        this.headers = new Headers({

        });
        if (csrf_token_name && csrf_token)
            this.headers.set(csrf_token_name, csrf_token);


=======
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

>>>>>>> eeb8872a25a0e951183c8704d0dcf62c4b013107
        //locate the file element meant for the file upload.
        let inputEl:HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount:number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            formData.append('file', inputEl.files.item(0));
            //call the angular http method
            this.http
            //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
<<<<<<< HEAD
                .post(URL, formData, {headers:this.headers})
=======
                .post(URL, formData, {headers: headers})
>>>>>>> eeb8872a25a0e951183c8704d0dcf62c4b013107
                .map((res:Response) => res.json()).subscribe((data) => {
                this.pathToPhoto = data;
                this.trip = this.tripService.getTrip();
                this.trip.photo = this.pathToPhoto;
                this.photo = new Photo(null, this.trip.album, this.userProfile, this.pathToPhoto, new Coordinates('point', 2.3, 3.2));
                this.httpService.addPhoto(this.photo).subscribe((data) => {
                    this.photo = data;
                });
                console.log(this.trip);
                this.httpService.addOrUpdateTrip(this.trip, this.userProfile.id).subscribe((data) => {
                    this.trip = data;
                });
            })
        }
    }

    addDay() {
        this.days.push(new Day(this.days[this.days.length - 1].id + 1,
            new Date(this.days[this.days.length - 1].name.valueOf() + 24 * 60 * 60 * 1000), []));
        this.trip = this.tripService.getTrip();
        this.trip.endDate = this.days[this.days.length - 1].name;
        this.tripService.addOrUpdateTrip(this.trip);
    }

    delete() {
        if (this.days.length >= 2) {
            this.days.pop();
            this.trip = this.tripService.getTrip();
            this.trip.endDate = this.days[this.days.length - 1].name;
            this.tripService.addOrUpdateTrip(this.trip);
        }
    }

    deleteMovements(id:number) {
        this.httpService.getMovement(id)
            .subscribe((data) => {
                this.movementToDelete = data;
            });
        this.httpService.deleteMovement(id)
            .subscribe((data) => {
                console.log(data);
                this.selectedDay.action.splice(this.selectedDay.action.indexOf(this.movementToDelete));
            })
    }

    deleteActivity(id:number) {
        this.httpService.getActivity(id)
            .subscribe((data) => {
                this.activityToDelete = data;
            });
        this.httpService.deleteActivity(id)
            .subscribe((data) => {
                console.log(data);
                this.selectedDay.action.splice(this.selectedDay.action.indexOf(this.activityToDelete));
            })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
        this.subOne.unsubscribe();
        this.subTwo.unsubscribe();
        this.subThree.unsubscribe();
    }
}
