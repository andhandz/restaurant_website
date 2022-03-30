import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<any> | undefined;
  constructor(private fireAuth: AngularFireAuth) {
    this.user= fireAuth.authState;
    fireAuth.authState.subscribe( auth => {
      if(auth) {
        console.log('logged-id');
        console.log(auth);
      } else {
        console.log('not logged-id');
        console.log(auth);
      }
    });
   }

   getClient(){
    return this.fireAuth.auth.currentUser;
   }
   
  login(email: string, password: string){
    return this.fireAuth.auth.signInWithEmailAndPassword(email,password);
  } 

  register(email: string, password: string){
    return this.fireAuth.auth.createUserWithEmailAndPassword(email,password);
  } 

  logout(){
    return this.fireAuth.auth.signOut();
  }

  getLogged(){
    return this.user;
  }

  persistence(str:string){
    return this.fireAuth.auth.setPersistence(str);
  }
}
