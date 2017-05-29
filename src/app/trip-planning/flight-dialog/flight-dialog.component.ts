import {Component, ElementRef, OnInit} from '@angular/core';
import {Movement} from "../../models/movements.interface";
import {TripService} from "../../services/trip.service";
import {Transport} from "../../models/transport.interface";
import {Coordinates} from "../../models/coordinates.interface";
import {Http, Response, Headers} from '@angular/http';
const URL = 'http://localhost:8181/fileUploadPage';

@Component({
    selector: 'app-flight-dialog',
    templateUrl: './flight-dialog.component.html',
    styleUrls: ['./flight-dialog.component.css']
})
export class FlightDialogComponent implements OnInit {
    flight:Movement;
    date:Date;
    pathToTicket:string;
    constructor(private tripService:TripService, private http:Http, private el:ElementRef) {
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
            destination_coordinates:null,
        }
    }

    addFlight(model:Movement) {
        model.transport = new Transport(1, "plane");
        console.log(model);
        this.tripService.setMovementSubject(new Movement(model.id, model.transport, model.travel, new Date(model.startTime), new Date(model.endTime),
            model.startAddress, model.destinationAddress, model.price, model.distance, model.description, this.pathToTicket, new Coordinates("point", 0.0 , 0.0), new Coordinates("point", 0 , 0)));
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
        this.pathToTicket='';
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
}
