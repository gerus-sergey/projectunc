import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {chatMessage} from "../models/chatMessage.inerface";

export class ChatService {

  private url = 'http://jj2017.ddns.net:5000';
  private socket;
  
  sendMessage(chatMessage:chatMessage){
    this.socket.emit('add-message', chatMessage);
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
