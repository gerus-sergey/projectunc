import {Gender} from "./gender.interface";
import {City} from "./city.interface";
import {Country} from "./country.interface";
import {Role} from "./role.interface";
export class UserRegistered {
    constructor(id:number, firstName:string, lastName:string, email:string, password:string, gender:Gender, city:City, role:Role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.gender = gender;
        this.city = city;
        this.role = role;
    }
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  gender:Gender
  city:City;
    role:Role;
}
