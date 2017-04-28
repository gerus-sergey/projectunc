import { LocalStorageService } from 'angular-2-local-storage';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import construct = Reflect.construct;
import {ActivatedRoute} from "@angular/router";

export class MainGuard implements CanActivate{
  reg:boolean;
  localStorageService: LocalStorageService;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

    if(localStorage.getItem("id") != route.parent.params['id']){
      this.reg = false;
      confirm('Error');
    }else{
      this.reg = true;
    }
     return this.reg  ;


    // if(localStorage.getItem("id") != "null"){
    //    this.reg = true;;
    // }else{
    //    this.reg = false;
    //     confirm('Вы не зарегистрированы!');
    // }
    // return this.reg;
  }
}
