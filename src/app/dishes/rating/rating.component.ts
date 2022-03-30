import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  val : number = 0;
  @Output() setRating = new EventEmitter();
  user: User;
  @Input() dish: any;
  cart: Cart[] = [];
  constructor(private cartService: CartService) { 
    this.user = JSON.parse(localStorage.getItem('loggedUser')!);
    this.cartService.getCarts(this.user!.email!).subscribe(
      c => {this.cart = Object.values(c)})
    }

  ngOnInit(): void {
  }

refresh(){
  if(this.dish!=undefined){
    if(this.cart!=undefined){
      for(let elem of this.cart){
        if(elem.name==this.dish.name){
          this.val=elem.rateValue
        }
      }
    }
  }
}

  set(elem: number){
    this.setRating.emit(elem);
    this.refresh();
  }
  color(){
    let myStyles={};
    if(this.val<=1){
      myStyles={'color' : 'red'};
    }
    else if(this.val==5){
      myStyles={'color' : 'green'};
    }
    else{
      myStyles={'color' : 'orange'};
    }
    return myStyles;
  }
}
