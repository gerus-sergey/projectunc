import {Trip} from "./trips.interface";
export class Album{
    id:number;
    name:string;
    createDate:Date;
    description:string;
    travel:Trip;

    constructor(id: number, name: string, createDate: Date, description: string, travel: Trip) {
        this.id = id;
        this.name = name;
        this.createDate = createDate;
        this.description = description;
        this.travel = travel;
    }
}
