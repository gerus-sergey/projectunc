/**
 * Created by Сергей on 04.05.2017.
 */
export class Activities{
    id:number;
    name:string;
    start_time:Date;
    end_time:Date;
    
    constructor(id:number, name:string, start_time:Date, end_time:Date) {
        this.id = id;
        this.name = name;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}