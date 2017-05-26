import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserRegistered} from "../models/user-registered.interface";
import {UserSignIn} from "../sign-in/user.sign-in.interface";
import {User} from "../models/user.interface";
import {Trip} from "../models/trips.interface";
import {chatMessage} from "../models/chatMessage.inerface";
import {Activities} from "../models/activities.interface";
import {Movement} from "../models/movements.interface";
import {Photo} from "../models/photo.interface";
import {Album} from "../models/album.interface";
import {Subject} from "rxjs/Subject";

declare var jQuery:any;

@Injectable()
export class HttpService {
    host:string = "http://localhost:8181/";
    //host:string = "http://jj-back-end-jj.7e14.starter-us-west-2.openshiftapps.com/";
    constructor(private http:Http) {
    }

    addPhoto(obj:Photo) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'photos/' , obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getAlbumsByTravelID(idTrip:number) {
        return this.http.get(this.host + 'albums/travel=' + idTrip)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    sendEmail(email: String, travelId: number, userId: number){
        return this.http.get(this.host + 'sendEmail/travel=' + travelId + '/user=' + userId + '/' + email)
            .map((resp: Response) => resp.json())
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    getAllUsers() {
        return this.http.get(this.host + 'users/')
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    addAlbum(obj:Album) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'albums/', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }
    
    addUser(obj:UserRegistered) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post(this.host + 'users', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    updateUser(obj:User) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post(this.host + 'users', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    signInUser(obj:UserSignIn) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'users/login/', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
    }


    getTravelsToUser(id) {
        return this.http.get(this.host + 'userToTravels/travelsByUserId/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getCountries() {
        return this.http.get(this.host + 'countries')
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getStatesOfTheCountry(id) {
        return this.http.get(this.host + 'states/country/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getCitiesOfTheState(id) {
        return this.http.get(this.host + 'cities/state/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getAlbums() {
        return this.http.get(this.host + 'account/albums/4')
    }

    getHomeTrips() {
        return this.http.get(this.host + 'travels')
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getProfileTrips() {
        return this.http.get(this.host + 'travels')
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    checkEmail(email) {
        return this.http.get(this.host + 'users/getByEmail/' + email)
    }


    getUser(id) {
        return this.http.get(this.host + 'users/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    addOrUpdateTrip(obj:Trip, id:number) {
        console.log(obj);
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);
        return this.http.post(this.host + 'travels?userId=' + id, obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getTrip(id:number) {
        return this.http.get(this.host + 'travels/' + id)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getActivitiesToTrip(idTrip:number) {
        return this.http.get(this.host + 'activities/travel/' + idTrip)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getMovementToTrip(idTrip:number) {
        return this.http.get(this.host + 'movements/travel/' + idTrip)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    sendChatMessage(obj:chatMessage) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'chatTravels', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getChatMessages(id:number) {
        return this.http.get(this.host + 'chatTravels/travel=' + id)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    addActivity(obj:Activities, id:number) {
        console.log(obj);
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'newactivities?travelId= ' + id, obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });


    }

    addMovement(obj:Movement, id:number) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'newmovements?travelId=' + id, obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    updateTrip(obj:Trip) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.post(this.host + 'travels', obj, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    deleteTrip(id:number) {
        var csrf_token = jQuery("meta[name='_csrf']").attr("content");
        var csrf_token_name = jQuery("meta[name='_csrf_header']").attr("content");
        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
        });
        if (csrf_token_name && csrf_token)
            headers.set(csrf_token_name, csrf_token);

        return this.http.delete(this.host + 'travels/' + id, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getParticipantsToTrip(id:number) {
        return this.http.get(this.host + 'userToTravels/usersToTravelByTravelId/' + id)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getRoleInTrip(userId:number, travelId:number) {
        return this.http.get(this.host + 'userToTravels/user=' + userId + '/travel=' + travelId)
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }
    private idSubject = new Subject<number>();
    id$ = this.idSubject.asObservable();

    setId(id: number) {
        console.log("id" + id);
        this.idSubject.next(id);
    }
}
