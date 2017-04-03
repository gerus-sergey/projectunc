import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {UserRegistered} from "../models/user-registered.interface";

@Injectable()
export class HttpService {
    private authToken;

    constructor(private http:Http) {
    }

    postData(obj:UserRegistered) {
        const body = JSON.stringify(obj);

        let headers = new Headers({
            'Content-Type': 'application/json;charset=utf-8'
            ,'Authorization':this.authToken
        });

        return this.http.post('http://localhost:8181/users', body, {headers: headers})
            .map((resp:Response)=>resp.json())
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getTravelsToUser(id) {
        return this.http.get('http://localhost:8181/userToTravels/travelsByUserId/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }

    getAlbums() {
        return this.http.get('assets/user.album.json')
    }
    getData() {
        return this.http.get('assets/trips.json')
    }
    getProfileTrips() {
        return this.http.get('http://localhost:8181/travels')
            .catch((error:any) => {
                return Observable.throw(error);
            });
        //return this.http.get('assets/prfile.trips.json')
    }

    checkEmail(email) {
        return this.http.get('http://localhost:8181/users/getByEmail/' + email)
    }

    getUser(id) {
        return this.http.get('http://localhost:8181/users/' + id)
            .catch((error:any) => {
                return Observable.throw(error);
            });
    }
}