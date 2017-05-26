import {Day} from "./day.interface";
import {Activities} from "./activities.interface";
import {Movement} from "./movements.interface";
import {Participant} from "./participant.interface";
import {Country} from "./country.interface";
import {Album} from "./album.interface";

export class Trip{
     id: number;
     photo: string;
     name: string;
     startDate: Date;
     endDate: Date;
     info: string;
     active:boolean;
     days: Day[] = [];
     activities: Activities[] = [];
     movements: Movement[] = [];
     participants: Participant[] = [];
     countries:Country[];
     album:Album;
}
