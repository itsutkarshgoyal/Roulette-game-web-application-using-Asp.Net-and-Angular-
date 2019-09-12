import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({

    templateUrl: "./user-roulette-win.component.html"
})
export class RouletteWinComponent implements OnInit {
    constructor(private userService: UserService,
        private router: Router) {
    }
    ngOnInit() {
        this.user = new User();
        this.role = "";
    }
    user: User;
    messages: string[] = [];
    role: string;

    goBack(user: User) {
        console.log("Logged in hehe ");
        console.log(sessionStorage);

        this.router.navigate(['Roulette/Play', user]);
        //this.router.navigate(['User/UserList']);
    }





    private handleErrors(errors: any) {
        this.messages = [];
        for (let msg of errors) {
            this.messages.push(msg);
        }
    }
}