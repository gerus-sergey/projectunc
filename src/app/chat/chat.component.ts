import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from './chat.service';
import {Subscription} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, HttpService]
})
export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  public userProfile: User;
  private id: number;
  private routeSubscription: Subscription;
  date: Date;

  //message: Message = new Message('', '');
  //messages: Message[] = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute, private httpService: HttpService) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.date = new Date();
  }


  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    //this.message.myDate = this.date.toString();
    //this.messages.push({msg: this.message.msg, myDate: this.message.myDate});
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.httpService.getUser(this.id)
      .subscribe((resp: Response) => {
        const user = resp.json();
        if (user)
          this.userProfile = user;
      });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
