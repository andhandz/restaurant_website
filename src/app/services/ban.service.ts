import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class BanService {
  private bannedUsers = 'bans';
  private users: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.users=db.list(this.bannedUsers);
   }

   deleteUser(key:string){
    this.users.remove(key);
  }

  addUser(user: User){
    const key = this.EmailToKey(user.email!);
    this.users.set(key,{...user});
  }

  getData(){
    return this.users;
  }

  EmailToKey(email:string){
    return email.replace('@', '').replace('$', '').replace('.', '').replace('[', '').replace('#', '').replace(']', '');
  }

}
