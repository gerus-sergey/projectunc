import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";
import {Response} from '@angular/http';
import {AdminUser} from "../models/adminUser";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    public allUsers:AdminUser[] = [];

    constructor(private httpService:HttpService) {
    }

    ngOnInit() {
        this.httpService.getAllUsers()
            .subscribe((resp: Response) => {
                const userList = resp.json();
                for (const index in userList){
                    const user = userList[index];
                    this.allUsers.push(user);
                }
            });

    }

    ban(id:number){
        console.log(id);
        console.log(this.allUsers);
        
        
    }

}
