import { Component, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from './post';
import { posts } from './posts';
import { User } from 'src/app/user';
import { BanService } from 'src/app/services/ban.service';
import { map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/cart';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  productsString: string ="";
  price : string ="";
  daneRef: any;
  dish: any;
  posts: Post[]=posts;
  post!:Post;
  userData: User;
  banList: any;
  counter!: number;
  exist = true;
  cart:Cart[] = [];
  constructor(private cartService: CartService,private banService: BanService, private route: ActivatedRoute,private dishService: DishesService) {
    this.userData = JSON.parse(localStorage.getItem('loggedUser')!);
   
    this.banService.getData().snapshotChanges().pipe(
      map(changes => changes.map((c: { payload: { key: any; val: () => any; }; }) => ({key : c.payload.key, ... c.payload.val()})))
    ).subscribe((bans: any) => {this.banList = bans;});
  }

  ngOnInit(): void {
    this.route.params.subscribe(param=> this.daneRef = param['key'])
    this.dishService.getDish(this.daneRef).subscribe(dish => {this.dish = dish})

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

  }

  wasBanned(userr:User){
    if(this.banList!.length==0){
      return false;
    }
    for(let user of this.banList!){
      if(user.email==userr.email){
        return true;
      }
    }
    return false;
  }
  

  updateDishQuantity(value:any){
    this.dishService.updateDish(this.dish.key,{quantity:value});
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

    val(){
      console.log(this.counter)
      if(this.cart==null || this.cart.length==0){
        return 0
      }
      return this.cart[this.dish.name].rateValue;
    }

    setRating(val: number){
      if(this.wasBanned(this.userData)){
        alert("Nie możesz wystawić oceny gdyż zostałeś zbanowany")
        return;
      }
      if((this.counter>0 && this.userData.roles?.user) || this.userData.roles?.admin){
      this.cartService.updateCart(this.dish.name,{rateValue: val},this.userData);
      
      }
      else{
        alert("Musisz zamówić by móc ocenić")
      }
  }

canWriteReview(){
if((this.userData.roles?.user && this.counter==0) || this.wasBanned(this.userData)){
  return false;
}
return true;
}

  submit(x:string,y:string,z:string,w:any){
    if(x.length==0 || y.length==0 ){
      alert("Nick oraz tytuł są wymagane")
      return;
    }
    this.post={
      nickname:x,
      title:y,
      body:z,
      date:w
    };
    if(this.post.body.length<50 || this.post.body.length>500){
      alert("Długość opinii musi zawierać min. 50 znaków oraz maksymalnie 500")
      return;
    }
    if(w.length==0){
      this.post.date="Nie podano daty";
    }
    this.posts.unshift(this.post);
  }

}
