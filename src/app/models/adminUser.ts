import {Gender} from "./gender.interface";
import {City} from "./city.interface";
import {State} from "./state.interface";
import {Country} from "./country.interface";
import {Role} from "./role.interface";

export class AdminUser {

    id:number;
    lastName:string;
    firstName:string;
    birthday:string;
    password:string;
    email:string;
    gender:Gender;
    country:Country;
    state:State;
    city:City;
    info:string;
    userPhoto:string;
    role:Role;
}
/**
 * Created by Сергей on 28.05.2017.
 */
