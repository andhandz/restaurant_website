import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Dish } from 'src/app/dish';
import { DishesService } from 'src/app/services/dishes.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent implements OnInit {
  @Input() dish: Dish = new Dish;
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

  ngOnInit(): void {
  }
  
    deleteDish(){
      this.dishService.deleteDish(this.dish.key);
      this.cartService.deleteFromAll(this.dish.name);
    }
    makestr(){
      this.productsString="";
      for(let product of this.dish.products){
        this.productsString+=product;
        this.productsString+=" ";
      }
  
    }
  }

