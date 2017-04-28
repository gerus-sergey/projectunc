import {Gender} from "./gender.interface";
import {City} from "./city.interface";
import {Country} from "./country.interface";
export class UserRegistered {
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  password:string;
  gender:Gender
  city:City;

  constructor(id:number, firstName:string, lastName:string, email:string, password:string, gender:Gender, city:City) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.gender = gender;
      this.city = city;
      }
}
