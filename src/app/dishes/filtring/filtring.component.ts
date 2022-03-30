import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-filtring',
  templateUrl: './filtring.component.html',
  styleUrls: ['./filtring.component.css']
})

export class FiltringComponent implements OnInit {
  cuisineFilter: string[]=[];
  categoryFilter: string[]=[];
  rateFilter: number[]=[];
  minp=0;
  maxp=0;
  strminp: String =""
  strmaxp: String =""
  filterTab=[this.cuisineFilter,this.categoryFilter,this.rateFilter]
  @Output() FilterTab = new EventEmitter();
  @Output() Maxp = new EventEmitter();
  @Output() Minp = new EventEmitter();
  @Input() max: any;
  @Input() min: any;
  @Input() euro: any;
  @Input() dolar: any;
  @Input() dishes: any;
  constructor() { }

  ngOnInit(): void {
    this.priceRange();
  }

  currency(){
    if(this.dolar){
      this.strminp = String(this.minp) + "$"
      this.strmaxp = String(this.maxp) + "$"
    }
    else{
      this.strminp = String(this.minp*0.9) + "€"
      this.strmaxp = String(this.maxp*0.9) + "€"
    }
  }

  getCuisine(){
    let array: string | string[] = [];
    for(let dish of this.dishes){
      if(!array.includes(dish.cuisine)){
        array.push(dish.cuisine);
      }
    }
    return array;
  }
  getCategory(){
    let array: string | string[] = [];
    for(let dish of this.dishes){
      if(!array.includes(dish.category)){
        array.push(dish.category);
      }
    }
    return array;
  }

  priceRange(){
    this.minp=this.min;
    this.maxp=this.max;
  }

  refreshMaxPrice(event:any){
    this.maxp = parseInt(event.target.value)
    this.emiting();
  }

  refreshMinPrice(event:any){
    this.minp = parseInt(event.target.value)
    this.emiting();
  }

  choosenCuisine(event: any){
    if(event.target.checked){
      this.cuisineFilter.push(event.target.value)
    
  }
  else{
    for(let i=0; i<this.cuisineFilter.length;i++){
      if(this.cuisineFilter[i]==event.target.value){
        this.cuisineFilter.splice(i,1);
      }
    }
  }
  this.emiting();
}

choosenCategory(event: any){
  if(event.target.checked){
    this.categoryFilter.push(event.target.value)
  
}
else{
  for(let i=0; i<this.categoryFilter.length;i++){
    if(this.categoryFilter[i]==event.target.value){
      this.categoryFilter.splice(i,1);
    }
  }
}
this.emiting();
}

choosenRate(event: any, c: number){
  if(event.target.checked){
    this.rateFilter.push(c);
  
}
else{
  for(let i=0; i<this.rateFilter.length;i++){
    if(this.rateFilter[i]==c){
      this.rateFilter.splice(i,1);
    }
  }
}
this.emiting();
}

emiting(){
  this.filterTab=[this.cuisineFilter,this.categoryFilter,this.rateFilter]
  this.FilterTab.emit(this.filterTab);
  this.Maxp.emit(this.maxp);
  this.Minp.emit(this.minp);
}
}
