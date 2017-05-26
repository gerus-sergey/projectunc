import {Activities} from "./activities.interface";
import {Movement} from "./movements.interface";
/**
 * Created by Сергей on 30.04.2017.
 */

export class Day {

    constructor(id:number, name:Date, action:(Activities|Movement)[]) {
        this.id = id;
        this.name = name;
        this.action = action;
    }

    id:number;
    name:Date;
    action:(Activities | Movement)[];
}