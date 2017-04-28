import { LocalStorageService } from 'angular-2-local-storage';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Rx";
import construct = Reflect.construct;

export class LoginGuard implements CanActivate{
  reg:boolean;
  localStorageService: LocalStorageService;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

    if(localStorage.getItem("id") != "null"){
       this.reg = true;;
    }else{
       this.reg = false;
        confirm('Вы не зарегистрированы!');
    }
    return this.reg;
  }
}
/**
 * Created by Сергей on 24.04.2017.
 */
