import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';
import { Country } from '../models/country.interface';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
// import { Ng2SearchPipe } from 'ng2-search-filter';

declare var gnMenu: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public id: number;
  public items: User[]= [];
  user: User;
  term: User;
  public userId: number;
  private routeSubscription: Subscription;


  constructor(private _location: Location, private routing: Router,  private route: ActivatedRoute, private sidebarEl: ElementRef, private httpService: HttpService, private localStorageService: LocalStorageService) {
    this.routeSubscription = this.route.params.subscribe(params => this.id = params['id']);
    httpService.id$.subscribe(
        id => {
          this.id = id;
          document.getElementById('reg').style.display = 'none';
          document.getElementById('log').style.display = 'none';
          document.getElementById('menu').style.display = 'block';
          document.getElementById('srch').style.display = 'block';
        });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
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


    if (localStorage.getItem('id') !== 'null' ){
      document.getElementById('reg').style.display = 'none';
      document.getElementById('log').style.display = 'none';
      document.getElementById('menu').style.display = 'block';
      document.getElementById('srch').style.display = 'block';
    }else {
      document.getElementById('menu').style.display = 'none';
      document.getElementById('srch').style.display = 'none';
      document.getElementById('reg').style.display = 'block';
      document.getElementById('log').style.display = 'block';
    }
    return this.id;
  }

  logout() {
    this.id = null;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('srch').style.display = 'none';
    document.getElementById('reg').style.display = 'block';
    document.getElementById('log').style.display = 'block';
    localStorage.setItem('id', null);
    console.log(localStorage.getItem('id'));
  }

  goToUser(uid) {
    this.routing.navigateByUrl('/user/' + uid);
    console.log(uid);
  }

}
