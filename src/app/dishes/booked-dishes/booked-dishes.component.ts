import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/services/cart.service';
import { DishesService } from 'src/app/services/dishes.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-booked-dishes',
  templateUrl: './booked-dishes.component.html',
  styleUrls: ['./booked-dishes.component.css']
})
export class BookedDishesComponent implements OnInit {
  userData!: User;
  cart: Cart[]=[];
  count=0;
  constructor(private authService: AuthService,private cartService: CartService,public dishService: DishesService) { 
    this.authService.getLogged()?.subscribe(auth => {
      if(auth){
    
      }this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
      this.cartService.getCarts(this.userData.email!).subscribe(
        c => {this.cart = Object.values(c)}
      )
    });
  }

  ngOnInit(): void {
  }

  counter(){
    let counter=0;
    for(let elem of this.cart){
      counter+=elem.count;
  }
  this.count=counter;
}

  changeBackground(){
    this.counter();
    let myStyles = {'background' : 'orange'};
    if(this.count>10){
      myStyles = {'background' : 'blue'};
    }
    return myStyles;
  }

}
