import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {HomeTrip} from "./home-trips.interface";
import {Response} from "@angular/http";

@Component({
  selector: 'app-home-trips',
  templateUrl: './home-trips.component.html',
  styleUrls: ['./home-trips.component.scss'],
  providers: [HttpService]
})
export class HomeTripsComponent implements OnInit {

  homeTrips: HomeTrip[]=[];

  constructor(private httpService: HttpService){}
  ngOnInit(){

    this.httpService.getData()
        .subscribe((resp: Response) => {
          let tripList = resp.json().travels;
          for(let index in tripList){
            console.log(tripList[index]);
            let trip = tripList[index];
            this.homeTrips.push({id: trip.id, img: trip.img, name: trip.name, start_date: trip.start_date, end_date: trip.end_date, info: trip.info});
          }
        });
  }

}
