import {Gender} from "./gender.interface";
import {City} from "./city.interface";
import {State} from "./state.interface";
import {Country} from "./country.interface";

export class User {
  constructor(id:number, lastName:string, firstName:string, birthday:string, email:string, password:string,
              gender:Gender, city:City, info:string) {
      this.id = id;
      this.lastName = lastName;
      this.firstName = firstName;
      this.birthday = birthday;
      this.email = email;
      this.password = password;
      this.gender = gender;
          this.city = city;
          this.info = info;
      }

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
  genders:string;
}
