import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";


import {Response} from "@angular/http";
import {ChatService} from "./chat.service";
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  providers: [ChatService, HttpService]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  public userProfile:User;
  private id:number;
  private routeSubscription:Subscription;
  myDate: Date;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private httpService: HttpService) {
    this.routeSubscription = route.params.subscribe(params=>this.id = params['id']);
  }


  sendMessage(){
    this.chatService.sendMessage(this.message);

    this.message = '';
    this.myDate = new Date();
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.httpService.getUser(this.id)
      .subscribe((resp: Response) => {
        let user = resp.json();
        if (user)
          this.userProfile = user;
      });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
