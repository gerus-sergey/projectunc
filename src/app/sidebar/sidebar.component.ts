import {Component, OnInit, ElementRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';
import {Router} from '@angular/router';


declare var gnMenu: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public id: number;
  public items: User[]= [];
  user: User;
  signOutSuccess: boolean = false;
  signOutMenu: boolean = false;

  constructor(private route:Router, private sidebarEl: ElementRef, private httpService: HttpService, private localStorageService: LocalStorageService) {
    httpService.id$.subscribe(
        id => {
          this.id = id;
          this.signOutMenu = false;
          console.log(this.signOutMenu);
        });
  }

  ngOnInit() {
    new gnMenu(this.sidebarEl.nativeElement.querySelector('.gn-menu-main'));
    this.id = parseInt(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));

    this.httpService.getAllUsers()
      .subscribe((resp: Response) => {
        const userList = resp.json();
        for (const index in userList){
          const user = userList[index];
          this.items.push(user);
        }
      });
    
    if(localStorage.getItem('id') == 'null'){
      this.signOutMenu = true;
    }else{
      this.signOutMenu = false;
    }
  }

  logout() {
    this.signOutSuccess = true;
    this.signOutMenu = true;
    this.id = null;
    localStorage.setItem('id',null);
    this.route.navigateByUrl("/");
    console.log(localStorage.getItem('id'));
  }


}
