import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { UserService } from './user/user.service';
import { UserListComponent } from './user/user-list.component';
import { UserRegisterComponent } from './user/user-register.component';
import { UserLoginComponent } from './user/user-login.component';
import { UserRechargeComponent } from './user/user-recharge.component';
import { RouletteComponent } from './user/user-roulette.component';
import { RouletteWinComponent } from './user/user-roulette-win.component';

@NgModule({
    imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule, ReactiveFormsModule],
    declarations: [UserListComponent, UserRegisterComponent,
        UserLoginComponent, AppComponent, UserRechargeComponent,
        RouletteComponent, RouletteWinComponent],
    bootstrap: [AppComponent],
    providers: [UserService]
})
export class AppModule { }
