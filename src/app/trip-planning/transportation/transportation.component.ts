import { Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.scss']
})
export class TransportationComponent implements OnInit {

  private tripPlanId:number = this.route.parent.snapshot.params["id"];
  private id:number = this.route.parent.snapshot.params["id"];
  private routeSubscription:Subscription;

  constructor(private route:ActivatedRoute, private httpService:HttpService) { }


  ngOnInit() {
  }

}
