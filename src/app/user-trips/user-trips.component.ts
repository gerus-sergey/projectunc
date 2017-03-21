import { Component, OnInit } from '@angular/core';
import {Response} from "@angular/http";
import {Trip} from "./trip.interface";
import {HttpService} from "../registered/http.service";


@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.scss'],
  providers: [HttpService]
})
export class UserTripsComponent implements OnInit {

  trips: Trip[]=[];

  constructor(private httpService: HttpService){}
  ngOnInit(){

    this.httpService.getData()
        .subscribe((resp: Response) => {
          let tripList = resp.json().travels;
          for(let index in tripList){
            console.log(tripList[index]);
            let trip = tripList[index];
            this.trips.push({id: trip.id, img: trip.img, name: trip.name, start_date: trip.start_date, end_date: trip.end_date, info: trip.info});
          }
        });
  }
}
