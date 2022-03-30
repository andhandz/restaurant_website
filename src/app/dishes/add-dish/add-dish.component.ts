import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { map } from 'rxjs';
import { Dish } from 'src/app/dish';
import { DishesService } from 'src/app/services/dishes.service';



@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {

  dishForm : FormGroup = Object()!;
  dish: Dish = new Dish();
  p:number = 1;
  x:number = 3;
  dishes: any;

  constructor(public formBuilder : FormBuilder,private dishesService: DishesService) { 
    
  }

  ngOnInit(): void {
    this.create();
    this.getDishes();
  }

  newDish(){
    this.dish = new Dish();
  }

  addDish(){
    this.dishesService.createDish(this.dish);
    this.dish = new Dish();
  }

  create(){
    this.dishForm=this.formBuilder.group({
      name:['',Validators.required],
      cuisine:['',Validators.required],
      category:['',Validators.required],
      products:['',Validators.required],
      quantity:['',Validators.required,Validators.min(1)],
      price:['',Validators.required,Validators.min(0)],
      description:['',Validators.required],
      img:['',Validators.required],
      rating: 0,
      cartCounter: 0
    })
    this.dishForm.value.rating = 0;
    this.dishForm.markAsUntouched();
  }

  click(){
    if(this.dishForm.value.price>100){
      alert("Danie nie może kosztować ponad 100$!")
    }
    else{
    this.dish.name=this.dishForm.value.name;
    this.dish.cuisine=this.dishForm.value.cuisine;
    this.dish.category=this.dishForm.value.category;
    this.dish.products=this.dishForm.value.products.split(',');
    this.dish.quantity=this.dishForm.value.quantity;
    this.dish.price=this.dishForm.value.price;
    this.dish.description=this.dishForm.value.description;
    this.dish.img=this.dishForm.value.img;
    this.dish.rating=this.dishForm.value.rating;
    this.dish.cartCounter=this.dishForm.value.cartCounter;
    this.addDish();
    }
    this.dishForm.reset();
    this.create();
  }

  getDishes(){
    this.dishesService.getDishes().snapshotChanges().pipe(
      map(changes => changes.map((c: { payload: { key: any; val: () => any; }; }) => ({key : c.payload.key, ... c.payload.val()})))
    ).subscribe((dishes: any) => {this.dishes = dishes;});
  }
  changePagValue(e:number){
    this.x=e;
  }

}
