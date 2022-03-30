import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users?: User[] | null;
  constructor(private usersData: UsersService, public dialog: MatDialog, private auth: AuthService,  private router: Router) {
    this.usersData.getData().snapshotChanges().pipe(map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(us =>{
      this.users = us;
      console.log(this.users);
    })
   }

  login='';
  hide=true;
  ngOnInit(): void {
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  throwError(){
    if(this.email.hasError('required')){
      return 'You need to enter value';
    }
    if(this.password.hasError('required')){
      return 'You need to enter value';
    }
    return this.email.hasError('email')? 'Not a valid email' : '';
  }

  register(){
    this.router.navigate(['/register-component'])
  }

  logIn(){
    let bool=false;
    if(this.users!=null){
    for(let user of this.users!){
      if(user.email==this.email.value){
        bool=true;
      }
    }
  }
  if(!bool){
    alert("nieprawidłowy mail")
  }
  else{
    console.log("log in");
    this.auth.login(this.email.value,this.password.value).catch(e => console.log(e.message));
    this.router.navigate(['']);
  }
}
}
