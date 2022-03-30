import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AddDishComponent } from './dishes/add-dish/add-dish.component';
import { DishEditorComponent } from './dishes/add-dish/dish-editor/dish-editor.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { ManagerGuard } from './guard/manager.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { UserpanelComponent } from './userpanel/userpanel.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'addDish', component: AddDishComponent, canActivate: [ManagerGuard]},
  {path: 'cart', component:CartComponent, canActivate: [AuthGuard]},
  {path:'dish/:key',component: DishDetailsComponent, canActivate: [AuthGuard]},
  {path:'edit/:key',component: DishEditorComponent, canActivate: [ManagerGuard]},
  { path: 'login-component', component: LoginComponent },
  { path: 'register-component', component: RegisterComponent },
  { path: 'userPanel', component: UserpanelComponent, canActivate: [AdminGuard]},
  {path: '**', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
