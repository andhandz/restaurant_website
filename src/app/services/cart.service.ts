import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs';
import { Cart } from '../cart';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = 'cart';
  private client: AngularFireList<Cart>;
  constructor(private db: AngularFireDatabase) {
    this.client=db.list(this.cart);
   }

   getData(){
     return this.client
   }

   deleteItem(key: string, user: User){
     const userKey = this.EmailToKey(user.email!);
     this.client.remove(userKey+'/'+key);
   }

   EmailToKey(email:string){
    return email.replace('@', '').replace('$', '').replace('.', '').replace('[', '').replace('#', '').replace(']', '');
  }

  addItem(item:Cart,user:User){
    const userKey = this.EmailToKey(user.email!);
    this.client.set(userKey + '/' + item.name,{...item})
  }

  getCarts(key:string){
      let clnt: AngularFireObject<any> = this.db.object(this.cart + '/' + this.EmailToKey(key));
      return clnt.snapshotChanges().pipe(map(c =>
        ({...c.payload.val()})))
  }

  updateCart(key:string,value:any,user:User){
    this.client.update(this.EmailToKey(user.email!) + '/' + key,value);
  }

  deleteFromAll(name:string){
    let query = this.client.query.ref.orderByKey();
    query.once('value')
    .then(snapshot => {
      snapshot.forEach(childSnapShot => {
        this.client.remove(childSnapShot.key + '/' + name);
      })
    })
  }

}
