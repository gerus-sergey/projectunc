import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {HttpService} from "../services/http.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers: [HttpService]
})
export class AccountComponent implements OnInit,OnDestroy {
  
  private id: number;
  private routeSubscription: Subscription;
  
  constructor(private route:ActivatedRoute, private httpService:HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
  }

}
