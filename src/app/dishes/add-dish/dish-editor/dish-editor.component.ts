import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/dish';
import { DishesService } from 'src/app/services/dishes.service';

@Component({
  selector: 'app-dish-editor',
  templateUrl: './dish-editor.component.html',
  styleUrls: ['./dish-editor.component.css']
})
export class DishEditorComponent implements OnInit {
  dishForm : FormGroup = Object()!;
  dish: any;
  dishKey!: string;
  constructor(private router: Router,public formBuilder : FormBuilder,private route: ActivatedRoute,private dishService:DishesService) { 
    this.dishForm=this.formBuilder.group({
      name:['',Validators.required],
      cuisine:['',Validators.required],
      category:['',Validators.required],
      products:['',Validators.required],
      quantity:['',[Validators.required,Validators.min(1)]],
      price:['',[Validators.required,Validators.min(0)]],
      description:['',Validators.required],
      img:['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.dishKey = param['key'];
      this.dishService.getDish(this.dishKey).subscribe(dish => {
        this.dish = dish;
        this.formValues(this.dish);
      });
    });
  }


  formValues(dish:Dish){
    this.dishForm.patchValue({
      name: dish.name,
      cuisine: dish.cuisine,
      category: dish.category,
      products: dish.products,
      quantity: dish.quantity,
      price: dish.price,
      description: dish.description,
      img: dish.img,
      rating: dish.rating,
      cartCounter: dish.cartCounter
    })
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
    this.dish.rating=0;
    this.dish.cartCounter=0;
    }
    this.dishService.updateDish(this.dishKey,{name:this.dish.name});
    this.dishService.updateDish(this.dishKey,{cuisine:this.dish.cuisine});
    this.dishService.updateDish(this.dishKey,{category:this.dish.category});
    this.dishService.updateDish(this.dishKey,{products:this.dish.products});
    this.dishService.updateDish(this.dishKey,{quantity:this.dish.quantity});
    this.dishService.updateDish(this.dishKey,{price:this.dish.price});
    this.dishService.updateDish(this.dishKey,{description:this.dish.description});
    this.dishService.updateDish(this.dishKey,{img:this.dish.img});
    this.dishService.updateDish(this.dishKey,{rating:this.dish.rating});
    this.dishService.updateDish(this.dishKey,{cartCounter:this.dish.cartCounter});
    alert("zaaktualizowany pomyslnie")
    this.router.navigate(['/addDish'])
  }
}
