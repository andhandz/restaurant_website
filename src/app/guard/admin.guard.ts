import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private userService: UsersService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getLogged()!.pipe(map(auth => {
        if (auth){
          const recivedData = localStorage.getItem('loggedUser')!;
          const userData: User = JSON.parse(recivedData);
          console.log(userData)
          if (userData.roles?.admin){
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
