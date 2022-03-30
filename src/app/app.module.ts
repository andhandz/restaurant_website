import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { BookedDishesComponent } from './dishes/booked-dishes/booked-dishes.component';
import { CartComponent } from './cart/cart.component';
import { AddDishComponent } from './dishes/add-dish/add-dish.component';
import { RatingComponent } from './dishes/rating/rating.component';
import { FiltringComponent } from './dishes/filtring/filtring.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../environments/environment';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { DishViewComponent } from './dishes/add-dish/dish-view/dish-view.component';
import { DishEditorComponent } from './dishes/add-dish/dish-editor/dish-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    BookedDishesComponent,
    CartComponent,
    AddDishComponent,
    RatingComponent,
    FiltringComponent,
    MenuComponent,
    HomeComponent,
    DishDetailsComponent,
    LoginComponent,
    RegisterComponent,
    UserpanelComponent,
    DishViewComponent,
    DishEditorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MatDialogModule
  ],
  providers: [ {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
