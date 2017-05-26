import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {HttpService} from "../../services/http.service";
import {Trip} from "../../models/trips.interface";

@Component({
  selector: 'app-home-trips',
  templateUrl: './home-trips.component.html',
  styleUrls: ['./home-trips.component.scss'],
  providers: [HttpService]
})
export class HomeTripsComponent implements OnInit {

  homeTrips: Trip[]=[];

  constructor(private httpService: HttpService){}
  ngOnInit(){

    this.httpService.getProfileTrips()
        .subscribe((resp: Response) => {
          let tripList = resp.json();
          for(let index in tripList){
            let trip = tripList[index];
            this.homeTrips.push(trip);
          }
        });
      
  }

}
