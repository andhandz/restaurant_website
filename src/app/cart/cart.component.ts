import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Cart } from '../cart';
import { CartService } from '../services/cart.service';
import { DishesService } from '../services/dishes.service';
import { User } from '../user';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User;
  cart: Cart[]=[];
  
  dolar: boolean = true;
  euro: boolean = false;
  Sumprice : string ="";
  constructor(public dishService: DishesService, private cartService: CartService,
    authService: AuthService) { 
      this.user = JSON.parse(localStorage.getItem('loggedUser')!);
    }

  ngOnInit(): void {
    this.readCart();
  }

  changeForEuro(){
    this.euro=true;
    this.dolar=false;
  }
  currencyForStart(){
    this.euro=false;
    this.dolar=true;
  }

  async readCart(){
    this.cartService.getCarts(this.user.email!).subscribe(
      c => {this.cart = Object.values(c)}
    )
  }
  ddd(){
  let x1 = 42;
  if (true) {
     console.log(x1);
     let x = 24;
  }   
}
  getSum(){
    let cartsum=0;
    for(let cartElem of this.cart){
    cartsum+=(cartElem.price*cartElem.count);
    }
    if(this.dolar){
      this.Sumprice=String(cartsum) + "$";
      }
      else{
        let euro = cartsum*0.9
      this.Sumprice=String(euro) + "€"
    }
    return this.Sumprice;
  }
}
