import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { UserSearch } from "./user-search";
import { User } from "./user";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';


@Component({
    templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit {
    constructor(private userService: UserService,
        private router: Router
       ) {

    }
    ngOnInit() {
        
        this.getUsers();
        
    }
    users: User[] = [];
    messages: string[] = [];
    searchEntity: UserSearch = new UserSearch();
   

    private getUsers() {
        this.userService.getUsers()
            .subscribe(users => this.users = users,
                errors => this.handleErrors(errors));
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

    add() {
        this.router.navigate(['/userRegister', -1]);
    }
    search() {
        this.userService.search(this.searchEntity)
            .subscribe(users => this.users = users,
                errors => this.handleErrors(errors));
    }

    Recharge(id: string) {
        console.log(id);
        this.router.navigate(['User/RechargeUser',id]);
    }

    deleteUser(id: number) {
        if (confirm("Delete this product??")) {
            this.userService.deleteUser(id)
                .subscribe(() => this.getUsers(),
                    errors => this.handleErrors(errors));
        }
    }
    
    private handleErrors(errors: any) {
        this.messages = [];
        for (let msg of errors) {
            this.messages.push(msg);
        }
    }
}