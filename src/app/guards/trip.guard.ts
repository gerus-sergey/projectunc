import {LocalStorageService} from 'angular-2-local-storage';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import construct = Reflect.construct;
import {HttpService} from "../services/http.service";
import {Participant} from "../models/participant.interface";

export class TripGuard implements CanActivate {
    reg:boolean = true;
    participents: Participant;
    localStorageService:LocalStorageService;
    //constructor(private httpService:HttpService){}
    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean> | boolean {



        return this.reg;

    }
}
