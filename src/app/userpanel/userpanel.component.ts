import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { BanService } from '../services/ban.service';
import { User } from '../user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {
  userDataList?: any[];
  rolesKeys = ['']
  banList?: any;

  constructor(private auth: AuthService, private userService: UsersService, private banService: BanService) { 
    this.userService.getData().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(users => {
      this.userDataList = users;
      this.userDataList.forEach(user => {
        user.rolesValues = Object.values(user.roles);
        user.rolesKeys = Object.keys(user.roles);
      })
    })

    this.banService.getData().snapshotChanges().pipe(
      map(changes => changes.map((c: { payload: { key: any; val: () => any; }; }) => ({key : c.payload.key, ... c.payload.val()})))
    ).subscribe((bans: any) => {this.banList = bans;});
  }
  

  ngOnInit(): void {
  }

  setLocal(){
    this.auth.persistence('local');
    this.auth.logout();
  }

  setSession(){
    this.auth.persistence('session');
    this.auth.logout();
  }

  setNone(){
    this.auth.persistence('none');
    this.auth.logout();
  }

showRole(user:User){
if(user.roles?.admin){
  return("admin");
}
else if(user.roles?.manager){
  return("manager");
}
return ("user");
}

giveBan(user:User){
  this.banService.addUser(user);
}

removeBan(key:string){
  this.banService.deleteUser(key);
}

visibility(key:string){
  if(this.banList.length==0){
    return true;
  }
  for(let user of this.banList){
    if(user.key==key){
      return false;
    }
  }
  return true;
}

click(e:string,user:User){
if(e=="admin"){
  user.roles!.admin=true;
  user.roles!.manager=false;
  user.roles!.user=false;
}
if(e=="manager"){
  user.roles!.admin=false;
  user.roles!.manager=true;
  user.roles!.user=false;
}
if(e=="user"){
  user.roles!.admin=false;
  user.roles!.manager=false;
  user.roles!.user=true;
}
this.userService.update(user.email!,{roles:user.roles})
}

}
