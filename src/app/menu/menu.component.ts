import { Component, OnInit } from '@angular/core';
import {Dish} from '../dish'
import { DishesService } from '../services/dishes.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../user';
import { UsersService } from '../services/users.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../cart';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  p:number = 1;
  x:number = 3;
  max : number = 100;
  min : number = 0;
  euro: boolean = false;
  dolar: boolean = true;
  dishesCounter: number = 0;
  filterTab: any[] = [[], [], []];
  minp : any = 0;
  maxp : any = 100;
  dishes: any;
  isLogged = false;
  userData?: User | null;
  cart:Cart[] =[];
  constructor(private cartService: CartService,private userService:UsersService,private angularFireAuth: AuthService,private dishesService: DishesService) {
    this.angularFireAuth.getLogged()?.subscribe(auth => {
      if(auth){
        this.isLogged=true;
        this.userService.getUser(auth.email).subscribe(
          user => {
            this.userData = user;
            localStorage.setItem('loggedUser', JSON.stringify(user));
          }
        )
        this.cartService.getCarts(auth.email!).subscribe(
          c => {this.cart = Object.values(c)}
        )
      }
      else{
        this.isLogged=false;
        localStorage.setItem('loggedUser','');
      }
    })
  
  }

  ngOnInit(){
    this.getDishes();
  }

  getDishes(){
    this.dishesService.getDishes().snapshotChanges().pipe(
      map(changes => changes.map((c: { payload: { key: any; val: () => any; }; }) => ({key : c.payload.key, ... c.payload.val()})))
    ).subscribe((dishes: any) => {this.dishes = dishes;});
  }

  maxPrice(){
  let maxi: number = 0;
  for(let dish of this.dishesService.items){
    if(dish.price>maxi){
      maxi = dish.price;
    }
  }
  this.max=maxi;
  }

  changePagValue(e:number){
    this.x=e;
  }

  minPrice(){
    let mini: number = 100;
    for(let dish of this.dishesService.items){
      if(dish.price<mini){
        mini = dish.price;
      }
    }
    this.min=mini;
    }
    
    initialMinMax(){
      if(this.dishesService.items.length!=0){
        this.maxPrice();
        this.minPrice();
      }
    }

   changeForEuro(){
    this.euro=true;
    this.dolar=false;
  }
  currencyForStart(){
    this.euro=false;
    this.dolar=true;
  }

  updateFilter(event:any){
    this.filterTab = event;
  }
  Minp(event:any){
    this.minp=event;
  }
  Maxp(event:any){
    this.maxp=event;
  }
  emitPrice(event:any){
    console.log(event)
    if(event<this.minp){
      this.minp = event
      this.min = this.minp
    }
    if(event>this.maxp){
      this.maxp = event
      this.max = this.maxp
    }
  }
  filterByCuisine(cuisine: String[],remaining: Dish[]){
    let arr=[];
    for(let dish of remaining){
      for(let cus of cuisine){
      if(dish.cuisine==cus){
        arr.push(dish);
      }
    }
  }
    return arr;
  }
  filterByCategory(category: String[], remaining: Dish[]){
    let arr=[];
    for(let dish of remaining){
      for(let cat of category){
      if(dish.category==cat){
        arr.push(dish);
      }
    }
    }
    return arr;
  }
  priceFilter(minp:number, maxp:number, remaining: Dish[]){
    let arr=[];
    for(let dish of remaining){
      if(dish.price>=minp && dish.price<=maxp){
        arr.push(dish);
      }
    }
    return arr;
  }
  rateFilter(rate:number[], remaining: Dish[]){
    let arr=[];
    for(let dish of remaining){
      for(let num of rate){
        if(this.isLogged){
          if(num==0){
            let bool=false;
            for(let elem of this.cart){
              if(elem.name==dish.name){
                bool=true;
              }
              if(!bool){
                arr.push(dish)
              }
            }
          }
          for(let elem of this.cart){
            if(elem.rateValue==num && dish.name==elem.name){
              arr.push(dish);
            }
          }
        }
      else{
      if(dish.rating==num){
        arr.push(dish);
      }
    }
    }
  }
    return arr;
  }

  filterDishes(){
    let dishesToShow=this.dishes;
    if(this.filterTab[0].length==0
    && this.filterTab[1].length==0 && 
    this.filterTab[2].length==0){
    }
    else{
    if(this.filterTab[0].length!=0){
      dishesToShow=this.filterByCuisine(this.filterTab[0], dishesToShow)
      }
    
    if(this.filterTab[1].length!=0){
      dishesToShow = this.filterByCategory(this.filterTab[1], dishesToShow)
    }
    
    if(this.filterTab[2].length!=0){
      dishesToShow = this.rateFilter(this.filterTab[2], dishesToShow)
    }
    }
  return this.priceFilter(this.minp,this.maxp,dishesToShow)
}
}