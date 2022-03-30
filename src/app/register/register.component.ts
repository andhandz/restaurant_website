import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide=true;
  users?: User[] | null;
  constructor(private usersData: UsersService, public dialog: MatDialog, private auth: AuthService, private route: Router) { 
    this.usersData.getData().snapshotChanges().pipe(map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(us =>{
      this.users = us;
      console.log(this.users);
    })
  }

  ngOnInit(): void {
  }

  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('', [Validators.required]);
  nickname = new FormControl('', [Validators.required]);

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
    if(this.checkValidData()){
    console.log('register in');
    this.auth.register(this.email.value, this.password.value).catch(e => console.log(e.message));
    let user: User = {
      email: this.email.value,
      nickname: this.nickname.value,
      roles:{
        user:true,
        manager:false,
        admin:false
      }
    }
    this.usersData.addUser(user);
    this.route.navigate(['']);
    alert("zarejestronwano użytkownika "+this.nickname.value)
    }
    else{
      alert("Rejestracja się nie powiodła")
    }
  }

  login(){
    this.route.navigate(['/login-component'])
  }

  checkValidData() {
    let res=true;
    if(this.users!=null){
      this.users?.forEach(us => {
        if(us.email == this.usersData.EmailToKey(this.email.value)){
          alert("Mail jest już zajęty")
          res = false;
        }
      })
    }
    if(this.password.value!=this.repeatPassword.value){
      return false;
    }
    return res && this.email.valid && this.password.valid && this.repeatPassword.valid &&
      this.nickname.valid;
  }
}
