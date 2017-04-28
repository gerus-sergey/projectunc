import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {User} from "../../models/user.interface";
import {HttpService} from "../../services/http.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [HttpService]
})
export class ProfileComponent implements OnInit,OnDestroy {

  public userProfile:User;
  private routeSubscription:Subscription;

  private sub: any;
  public id: number;

  constructor(private route:ActivatedRoute, private httpService:HttpService) {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    this.httpService.getUser(this.route.parent.snapshot.params["id"])
      .subscribe((resp:Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
      });

    this.sub = this.route.parent.params.subscribe(params => {
      this.id = +params["id"];

    });
  }

}
