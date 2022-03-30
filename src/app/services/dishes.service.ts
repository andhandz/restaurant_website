import { Injectable } from '@angular/core';
import {Dish} from 'src/app/dish'
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DishesService {
  items: Dish[] = [];
  daneRef: AngularFireList<Object>
  constructor(private db: AngularFireDatabase) { 
    this.daneRef = db.list("dishes");
    this.daneRef.snapshotChanges().pipe(
      map(changes => changes.map((c: { payload: { key: any; val: () => any; }; }) => ({key : c.payload.key, ... c.payload.val()})))
    ).subscribe((dishes: any) => {this.items = dishes;});
  }

  createDish(dish:Dish): void{
    this.daneRef.push(dish);
  }

  updateDish(key:string,value:any){
    this.daneRef.update(key,value);
  }  

  deleteDish(key:string){
    this.daneRef.remove(key);
  }

  getDishes(){
    return this.daneRef;
  }

  getDish(key:string){
    let path: AngularFireObject<Dish> = this.db.object('dishes'+'/'+key);
    return path.snapshotChanges().pipe(map(changes => ({ key: changes.payload.key, ...changes.payload.val() })));
  }

}
