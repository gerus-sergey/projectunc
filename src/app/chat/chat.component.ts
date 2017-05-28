import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatService} from './chat.service';
import {Subscription} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';
import {chatMessage} from "../models/chatMessage.inerface";
import {LocalStorageService} from 'angular-2-local-storage';
import {Trip} from "../models/trips.interface";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    providers: [ChatService, HttpService]
})

export class ChatComponent implements OnInit, OnDestroy {

    public userProfile:User;
    private id:number;
    private routeSubscription:Subscription;
    messages:chatMessage[] = [];
    connection;
    message:chatMessage;
    newMessage;
    msg;
    date:Date;
    trip:Trip;
    txtHTML:string;

    constructor(private chatService:ChatService, private route:ActivatedRoute, private httpService:HttpService,
                private localStorageService:LocalStorageService) {
        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
        this.date = new Date();
    }

    ngOnInit() {
        this.message = {
            id: null,
            travel: null,
            sender: null,
            sendTime: null,
            body: ''
        };

        this.httpService.getChatMessages(this.id)
            .subscribe((data) => {
                this.messages = data;
            });


        this.httpService.getUser(parseInt(localStorage.getItem('id')))
            .subscribe((resp:Response) => {
                const user = resp.json();
                if (user)
                    this.userProfile = user;
                console.log(this.userProfile);
            });

        this.httpService.getTrip(this.id)
            .subscribe((data) => {
                this.trip = data;
            });

        this.connection = this.chatService.getMessages().subscribe(msg => {

            this.newMessage = msg;
            if (this.id == this.newMessage.text.travel.id) {
                this.messages.push(new chatMessage(null, this.newMessage.text.travel, this.newMessage.text.sender,
                    this.newMessage.text.sendTime, this.newMessage.text.body));
            }

            if (this.message.sender.id.toString() !== 'null') {
                if (this.message.sender.id.toString() == localStorage.getItem('id')) {
                    // document.getElementById('sender').style.cssFloat = 'left';
                    document.getElementById('sender').style.background = 'dodgerblue';
                } else {
                    // document.getElementById('sender').style.cssFloat = 'right';
                    document.getElementById('sender').style.background = 'palegoldenrod';
                }
            }

            console.log(this.message.sender.id + ' ' + parseInt(localStorage.getItem('id')));


        });


    }

    sendMessage() {
        console.log(this.msg);
        if (this.msg != "") {
            this.message = new chatMessage(null, this.trip, this.userProfile, new Date, this.msg);

            this.httpService.sendChatMessage(this.message)
                .subscribe((data) => {
                    console.log(data);
                });

            this.chatService.sendMessage(this.message);
            this.msg = '';
        }
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
}
