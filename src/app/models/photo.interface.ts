import {Album} from "./album.interface";
import {User} from "./user.interface";
import {Coordinates} from "./coordinates.interface";
/**
 * Created by qwerty on 22.05.2017.
 */
export class Photo{
    private id:number;
    private album:Album;
    private owner:User;
    private pathToPhoto:string;
    private coordinate:Coordinates;

    constructor(id: number, album: Album, owner: User, pathToPhoto: string, coordinate: Coordinates) {
        this.id = id;
        this.album = album;
        this.owner = owner;
        this.pathToPhoto = pathToPhoto;
        this.coordinate = coordinate;
    }
}
