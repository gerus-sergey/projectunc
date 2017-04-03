import { Component, OnInit } from '@angular/core';
import {Album} from "../models/album.interface";
import {HttpService} from "../services/http.service";
import {Response} from "@angular/http";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.scss'],
    providers: [HttpService]
})
export class ProfilePhotosComponent implements OnInit {

  public albums: Album[] = [];

  private id: number;
  private routeSubscription: Subscription;
  
  constructor(private httpService: HttpService,private route: ActivatedRoute){
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }
  ngOnInit(){
    this.routeSubscription.unsubscribe();
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
