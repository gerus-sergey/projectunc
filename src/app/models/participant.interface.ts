import {User} from "./user.interface";
import {Role} from "./role.interface";
import {Trip} from "./trips.interface";

export class Participant{
    constructor(role:Role, user:User, travel:Trip) {
        this.role = role;
        this.user = user;
        this.travel = travel;
    }

    role: Role;
    user: User;
    travel: Trip;
}