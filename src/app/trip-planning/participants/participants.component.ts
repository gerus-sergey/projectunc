import { Component, OnInit } from '@angular/core';
import {Participant} from "../../models/participant.interface";
import {TripService} from "../../services/trip.service";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {


  participants: Participant[] = [];
  ivitation: string;
  tripPlanId: number;
  private routeSubscription:Subscription;

  constructor(private tripService:TripService, private route: ActivatedRoute, private httpService: HttpService, private localStorageService: LocalStorageService) {
    this.routeSubscription = route.params.subscribe(params=>this.tripPlanId = params['id']);
    tripService.participant$.subscribe(
        participant => {
          this.participants = participant;
          //console.log(this.participants);
        });
  }

  ngOnInit() {

  }

  sendEmail(ivitation: string){
    if (ivitation){
      this.ivitation = ivitation;
      console.log(this.ivitation);
      this.httpService.sendEmail(this.ivitation, this.tripPlanId, parseInt(localStorage.getItem('id')))
          .subscribe((data) => {
            console.log(data);
          });
    }
  }
}
