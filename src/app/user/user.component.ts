import {Component, OnInit, OnDestroy} from '@angular/core';
import {User} from "../models/user.interface";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";
import {HttpService} from "../services/http.service";
import {Response} from "@angular/http";
import {Trip} from "../models/trips.interface";
import {Album} from "../models/album.interface";



@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [HttpService]
})
export class UserComponent implements OnInit, OnDestroy {
    public userAccount:User;
    private id:number;
    private routeSubscription:Subscription;
    public trips: Trip[]=[];
    public albums: Album[] = [];
    constructor(private route:ActivatedRoute, private httpService:HttpService) {
        this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
  
    ngOnInit() {
        this.httpService.getUser(this.id)
            .subscribe((resp:Response) => {
                let user = resp.json();
                if (user)
                    this.userAccount = user;
            });

        this.httpService.getTravelsToUser(this.id)
            .subscribe((resp: Response) => {
                let tripList = resp.json();
                for(let index in tripList){
                    console.log(tripList[index]);
                    let trip = tripList[index];
                    this.trips.push(trip);
                }
            });

        this.httpService.getAlbums()
            .subscribe((resp: Response) => {
                let albumList = resp.json().albums;
                for(let index in albumList){
                    console.log(albumList[index]);
                    let album = albumList[index];
                    this.albums.push(album);
                }
            });
    }

}
