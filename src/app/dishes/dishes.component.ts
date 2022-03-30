import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Dish } from '../dish';
import { DishesService } from '../services/dishes.service';
import { User } from '../user';



@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  @Input() dish: Dish = new Dish;
  @Input() max: any;
  @Input() min: any;
  @Input() euro: any;
  @Input() dolar: any;
  counter!: number;
  exist = true;
  productsString: string ="";
  price : string ="";
  rating : number = 0;
  userData!: User;
  constructor(private cartService: CartService,private dishService: DishesService, private authService: AuthService) {
    this.authService.getLogged()?.subscribe(auth => {
      if(auth){
    
      }this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
      this.cartService.getCarts(this.userData.email!).subscribe(
        c => {
          if(c[this.dish.name]!=undefined){
            this.counter = c[this.dish.name].count;
            this.exist= true;
          }
          else{
            this.counter=0;
            this.exist=false;
          }
        }
      )
    });
  }

  ngOnInit(){
  }

  updateDishQuantity(value:any){
  this.dishService.updateDish(this.dish.key,{quantity:value});
  }

  updateDishRating(value:number){
    this.dishService.updateDish(this.dish.key,{rating:value});
  }

  updateCartCounter(value:number){
    this.dishService.updateDish(this.dish.key,{cartCounter:value});
  }

  currency(){
    if(this.dolar){
    this.price=String(this.dish.price) + "$";
    }
    else{
      let euro = this.dish.price*0.9
    this.price=String(euro) + "€"
    }
  }

  makestr(){
    this.productsString="";
    for(let product of this.dish.products){
      this.productsString+=product;
      this.productsString+=" ";
    }

  }

  addDish(){
    this.counter++;
    if(this.counter == 1 && this.exist==false){
      let item ={
        name: this.dish.name,
        price: this.dish.price,
        count: this.counter,
        rate: false,
        rateValue: 0
      }
      this.cartService.addItem(item,this.userData);
    }
    else{
      this.cartService.updateCart(this.dish.name,{count: this.counter},this.userData);
    }
    this.dish.quantity--;
    this.updateDishQuantity(this.dish.quantity);
  }


  rmvDish(){
    this.counter--;
    this.cartService.updateCart(this.dish.name,{count:this.counter},this.userData);
    this.dish.quantity++;
    this.updateDishQuantity(this.dish.quantity);
  }

  styleDisplayAddBtn(){
    let myStyles = {
      'display' : 'inline',
    }
    if (this.dish.quantity == 0){
      myStyles = {'display' : 'none'}
    }
    return myStyles;
  }

  styleDisplayRmvBtn(){
    let myStyles = {
      'display' : 'inline',
    }
    if (this.counter== 0){
      myStyles = {'display' : 'none'}
    }
    return myStyles;
  }

  Comunicat(){
    if(this.dish.quantity>0){
      return "Można jeszcze zamówić: " + this.dish.quantity
    }
    return "Osiągnieto limit zamówienia!"
  }

  ComunicatVisualChanges(){
    let myStyles = {
      'color' : 'green'
    };
    if(this.dish.quantity==0){
      myStyles = {'color' : 'red'};
    }
    else if(this.dish.quantity<=5){
      myStyles={'color' : 'orange'};
    }
    return myStyles
  }
  ifExtreme(dish:any){
    let myStyles = {}
    if(dish.price==this.min){
      myStyles = {'border' : 'solid 3px red'};

    }
    else if(dish.price==this.max){
      myStyles = {'border' : 'solid 3px green'}
    }
    return myStyles
  }
}
