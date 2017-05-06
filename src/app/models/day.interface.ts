import {Activities} from "./activities.interface";
/**
 * Created by Сергей on 30.04.2017.
 */

export class Day{
    constructor(id:number, name:Date, activities:Activities[]) {
        this.id = id;
        this.name = name;
        this.activities = activities;
    }
    id:number;
    name:Date;
    activities: Activities[];
    
}