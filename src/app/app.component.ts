import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';
import { User } from './user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zad8';
  userEmail = '';
  isLogged = false;
  userData?: User | null;
  constructor(private userService: UsersService, public dialog: MatDialog, private angularFireAuth: AuthService, private auth: AuthService, private router:Router) {
    this.angularFireAuth.getLogged()?.subscribe(auth => {
      if(auth){
        this.isLogged=true;
        this.userEmail=auth.email;
        this.userService.getUser(this.userEmail).subscribe(
          user => {
            this.userData = user;
            localStorage.setItem('loggedUser', JSON.stringify(user));
          }
        )
      }
      else{
        this.isLogged=false;
        this.userEmail='';
        this.userData=null;
        localStorage.setItem('loggedUser','');
      }
    })
  }

  ngOnInit(){
  }

  login(){
    this.router.navigate(['/login-component']);
  }

  register(){
    this.router.navigate(['/register-component']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
