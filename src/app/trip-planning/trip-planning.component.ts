import {Component, OnInit,OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
export class Days {
  id:number;
  name:string;
}

@Component({
  selector: 'app-trip-planning',
  templateUrl: './trip-planning.component.html',
  styleUrls: ['./trip-planning.component.css'],
  providers: [HttpService]
})
export class TripPlanningComponent implements OnInit, OnDestroy {
  showDialog = false;
  public days:Days[];
  public i:number = 1;

  private id:number;
  private profileId:number = this.route.parent.parent.snapshot.params["id"];
  private routeSubscription:Subscription;

  constructor(private route:ActivatedRoute, private httpService:HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    this.days = [{
      id: 1,
      name: 'Day 1'
    }];
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  addDay() {
    this.i = this.i + 1;
    this.days.push({id: this.i, name: "Day" + this.i});
  }

  ngOnInit() {

  }

}
