import { Component, OnInit } from '@angular/core';
import {Album} from "./album.interface";
import {HttpService} from "../registered/http.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.scss'],
  providers: [HttpService]
})
export class UserAlbumsComponent implements OnInit {
  
  public albums: Album[] = [];

  constructor(private httpService: HttpService){}
  ngOnInit(){

    this.httpService.getAlbums()
        .subscribe((resp: Response) => {
          let albumList = resp.json().albums;
          for(let index in albumList){
            console.log(albumList[index]);
            let album = albumList[index];
            this.albums.push({id: album.id, img: album.img, name: album.name, date_of_creation: album.date_of_creation, description: album.description});
          }
        });
  }

}
