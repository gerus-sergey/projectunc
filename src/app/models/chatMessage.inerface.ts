import {User} from "./user.interface";
import {Trip} from "./trips.interface";
export class chatMessage {
    constructor(id:number, travel:Trip, sender:User, sendTime:Date, body:string) {
        this.id = id;
        this.travel = travel;
        this.sender = sender;
        this.sendTime = sendTime;
        this.body = body;
    }
    id: number;
    travel: Trip;
    sender:User;
    sendTime:Date;
    body:string;
}
