import {Component, ElementRef, OnInit} from '@angular/core';
import {Activities} from "../../models/activities.interface";
import {TripService} from "../../services/trip.service";
import {Coordinates} from "../../models/coordinates.interface";
import {ActivityType} from "../../models/activityType.interface";
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Http, Response, Headers} from '@angular/http';
const URL = 'http://localhost:8181/fileUploadPage';
@Component({
    selector: 'app-lodging',
    templateUrl: './lodging.component.html',
    styleUrls: ['./lodging.component.css']
})
export class LodgingComponent implements OnInit {
    private tripId:number;
    lodging:Activities;
    pathToTicket:string;
    private routeSubscription:Subscription;
    constructor(private route:ActivatedRoute,private _location:Location,private tripService:TripService, private http:Http, private el:ElementRef) {
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

    upload() {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
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
                .post(URL, formData, {headers:headers})
                .map((res:Response) => res.json()).subscribe((data) => {
                this.pathToTicket = data;
            })
        }
    }

    backClick() {
        this._location.go("/trip-planning/" + this.tripId);
    }
    
}
