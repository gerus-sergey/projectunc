import { Component, OnInit } from '@angular/core';
import {Travels} from "../../models/travels.interface";
import {Response} from '@angular/http';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-trip-info-field',
  templateUrl: './trip-info-field.component.html',
  styleUrls: ['./trip-info-field.component.css'],
  providers: [HttpService]
})
export class TripInfoFieldComponent implements OnInit {

  travels: Travels[]=[];

  constructor(private httpService: HttpService){}
  ngOnInit() {
    this.httpService.getTravels()
      .subscribe((resp: Response) => {
        let travelList = resp.json().travels;
        for(let index in travelList){
          console.log(travelList[index]);
          let travel = travelList[index];
          this.travels.push({id: travel.id, name: travel.name, start_date: travel.start_date, end_date: travel.end_date, info: travel.info, isactive: travel.isactive});
        }
      });
  }

}
