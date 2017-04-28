import {Component, OnInit, ElementRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
declare var gnMenu:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public id:number;
  
  constructor(private sidebarEl:ElementRef,private localStorageService: LocalStorageService) { }

  ngOnInit() {
    new gnMenu(this.sidebarEl.nativeElement.querySelector('.gn-menu-main'));
    this.id = parseInt(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));
  }
  logout(){
    this.id = null;
    localStorage.setItem('id',null);
    console.log(localStorage.getItem('id'));
  }
}
