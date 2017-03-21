import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpTripService{

    constructor(private http: Http){ }

    getData(){
        return this.http.get('trips.json')
    }
}