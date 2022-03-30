
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = 'users';
  private client: AngularFireList<User>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) { 
    this.client = db.list(this.users);
  }

  getData(){
    return this.client;
  }

  deleteUser(key:string){
    this.client.remove(key);
  }

  addUser(user: User){
    const key = this.EmailToKey(user.email!)
    this.client.set(key,{...user})
  }

  update(key:string, value: any){
    key=this.EmailToKey(key);
    this.client.update(key,value);
  }

  EmailToKey(email:string){
    return email.replace('@', '').replace('$', '').replace('.', '').replace('[', '').replace('#', '').replace(']', '');
  }

  getUser(email:string){
    const key = this.EmailToKey(email);
    let tempClient: AngularFireObject<User> = this.db.object(this.users + '/'+ key);
    return tempClient.snapshotChanges().pipe(map(changes => ({ key: changes.payload.key, ...changes.payload.val() })));
  }

  getUsers(){
    return this.client.snapshotChanges().pipe( map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()}))));
  }

  isAdmin(){
    this.authService.getLogged()?.pipe(map(auth => {
      if (auth){
        console.log('zalogowany');
        return this.getUser(auth.email).pipe(map(user => {
          if(user.roles?.admin==true){
          return user.roles.admin;
          }
          else{
            return false;
          }
    }))
  }
  else{
    console.log('niezalogowany');
    return false;
    }
      }))
  }
}
  
