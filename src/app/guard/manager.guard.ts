import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLogged()!.pipe(map(auth => {
        if (auth){
          const recivedData = localStorage.getItem('loggedUser')!;
          const userData: User = JSON.parse(recivedData);
          if (userData.roles?.admin || userData.roles?.manager){
            return true;
          }
          else{
            alert("Nie masz wystarczających uprwanień")
            return false;
          }
  }
  else{
    return false;
  }
}));
}
  
}
