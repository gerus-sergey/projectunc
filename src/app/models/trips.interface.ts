import {Day} from "./day.interface";
export class Trip{
     id: number;
     img: string;
     name: string;
     startDate: Date;
     endDate: Date;
     info: string;
     active:boolean;
     days: Day[] = [];
}
