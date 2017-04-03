import { Component, OnInit } from '@angular/core';

export class Days {
 id: number;
 name: string;
}


@Component({
  selector: 'app-trip-planning',
  templateUrl: './trip-planning.component.html',
  styleUrls: ['./trip-planning.component.css']
})
export class TripPlanningComponent implements OnInit {
  showDialog = false;
  public days: Days[];
  public i:number = 1;

  constructor() {
    this.days = [{
      id: 1,
      name: 'Day 1'
    }];
  }

  addDay(){
      this.i=this.i+1;
      this.days.push({id: this.i, name: "Day" + this.i});
  }

  ngOnInit() {

    }

}
