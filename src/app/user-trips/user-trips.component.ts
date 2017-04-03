import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {Trip} from "../models/user-trip.interface";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss'],
  providers: [HttpService]
})
export class UserTripsComponent implements OnInit {

    public trips: Trip[]=[];
    private id:number;
    private routeSubscription:Subscription;

    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }
    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
    ngOnInit(){
    this.httpService.getTravelsToUser(this.route.parent.snapshot.params["id"])
        .subscribe((resp: Response) => {
          let tripList = resp.json();
          for(let index in tripList){
            console.log(tripList[index]);
            let trip = tripList[index];
            this.trips.push(trip);
          }
        });
  }
}
