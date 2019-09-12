import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user";
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Component({
  
    templateUrl: "./user-login.component.html"
})
export class UserLoginComponent implements OnInit {
    constructor(private userService: UserService,
        private router: Router) {
    }
    ngOnInit() {
        this.user = new User();
        
    }
    user: User;
    messages: string[] = [];
    role: string;

    goBack(id:string) {
        console.log("Logged in hehe ");
        console.log(sessionStorage);
        this.role = sessionStorage.getItem('ID');
        console.log(this.role);

        this.router.navigate(['Roulette/Play', id]);
        //this.router.navigate(['User/UserList']);
    }
    Home() {
        this.router.navigate(['User/Index']);
    }
    LoginUser() {
        this.router.navigate(['User/Login']);
    }
    UserList() {
        this.router.navigate(['User/UserList']);
    }

    Login() {
        this.userService.Login(this.user)
            .subscribe((data: User) => {
                
                sessionStorage['ID'] = data.uniqueID;
                sessionStorage['Name'] = data.name;
                sessionStorage['Balance'] = data.balance;
               // console.log(sessionStorage.getItem('ID'));
                if (data) {
                   
                    this.goBack(this.user.uniqueId);
                }
                else {
                    alert("Wrong Credentials");
                }
            },errors => this.handleErrors(errors));
    }
    
 
    private handleErrors(errors: any) {
        for (let msg of errors) {
            this.messages.push(msg);
        }
        //return Observable.throw(errors);
    }
    
}