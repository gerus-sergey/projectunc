import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.interface";
import {HttpService} from "../services/http.service";
import {Response} from '@angular/http';
import {AdminUser} from "../models/adminUser";
import {Role} from "../models/role.interface";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
    public allUsers:AdminUser[] = [];
    userBunning:AdminUser;
     i:number;
    constructor(private httpService:HttpService) {
    }

    ngOnInit() {
        this.httpService.getAllUsers()
            .subscribe((resp:Response) => {
                const userList = resp.json();
                for (const index in userList) {
                    const user = userList[index];
                    this.allUsers.push(user);
                    console.log(this.allUsers);
                }
            });

    }

    ban(id:number) {
        console.log(id);
        if (id != null) {
            for (var i = 0; i < this.allUsers.length; i++) {
                if (this.allUsers[i].id == id) {
                    console.log(this.allUsers[i]);
                    this.userBunning = this.allUsers[i];
                    this.userBunning.role = new Role(3, '');
                    this.httpService.addUser(this.userBunning)
                        .subscribe((data) => {
                            console.log(data);
                        });
                }
            }
        }
    }

    unban(id:number) {
        if (id != null) {
            for (var i = 0; i < this.allUsers.length; i++) {
                if (this.allUsers[i].id == id) {
                    console.log(this.allUsers[i]);
                    this.userBunning = this.allUsers[i];
                    this.userBunning.role = new Role(2, '');
                    this.httpService.addUser(this.userBunning)
                        .subscribe((data) => {
                            console.log(data);
                        });
                }
            }
        }

    }

}
