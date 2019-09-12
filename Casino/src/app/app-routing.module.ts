import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { UserListComponent } from './user/user-list.component';
import { UserRegisterComponent } from './user/user-register.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserRechargeComponent } from './user/user-recharge.component';
import { RouletteComponent } from './user/user-roulette.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouletteWinComponent } from './user/user-roulette-win.component';


const routes: Routes = [
    {
        path: 'Roulette/Play/:id',
        component: RouletteComponent
    },
    {
        path: 'Roulette/Win',
        component: RouletteWinComponent
    },
    {
        path: 'User/UserList',
        component: UserListComponent
    },
    {
        path: 'User/RechargeUser/:id',
        component: UserRechargeComponent
    },
    {
        path: 'userList',
        component: UserListComponent
    },
    {
        path: 'userRegister/:id',
        component: UserRegisterComponent
    },
    {
        path: 'User/Register',
        redirectTo: 'userRegister/-1'
    },
    {
        path: 'User/Index',
        redirectTo: 'userList'
    },
    {
        path: 'User/Login',
        component: UserLoginComponent
    },
   


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    
    bootstrap: [AppComponent],
    exports: [RouterModule]
})
export class AppRoutingModule { }
