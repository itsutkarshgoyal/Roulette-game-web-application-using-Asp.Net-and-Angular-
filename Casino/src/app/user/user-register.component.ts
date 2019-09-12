import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "./user";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

@Component({
   
    templateUrl: "./user-register.component.html"
})

export class UserRegisterComponent implements OnInit {
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private formBuilder: FormBuilder) {
    }
    user: User;
    messages: string[] = [];
    productForm: FormGroup;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                if (params['id'] != "-1") {
                    this.userService.getUser(params['id'])
                        .subscribe(user => this.user = user,
                            errors => this.handleErrors(errors));
                }
                else {
                    this.user = new User();
                    this.user.balance = 500;
                   

                }
            }
        });
        this.productForm = this.formBuilder.group({
            mobile: ['', [Validators.pattern('[6-9]\\d{9}')]]
        });
        this.user = new User();
    }

   

    goBack() {
        //this.location.back();
        
        this.router.navigate(['/User/UserList']);
    }
    ReturnBack(id: User) {
        //this.location.back();
        
        alert("Registration Successful! ,Your login id is : " + id);
        this.router.navigate(['/User/UserList']);
    }

    updateUser(user: User) {
        this.userService.updateUser(user)
            .subscribe(() => this.goBack(),
                errors => this.handleErrors(errors));

    }

    private addUser(user: User) {
        this.userService.addUser(user)
            .subscribe((data: User) => {
                var id = data;
                if (data) this.ReturnBack(id) 
            },
                errors => this.handleErrors(errors));
    }
   

    saveUser() {
        if (this.user) {
            if (this.user.id) {
                this.updateUser(this.user);
            }
            else {
                this.addUser(this.user);
            }
        }
    }
    private handleErrors(errors: any) {
        for (let msg of errors) {
            this.messages.push(msg);
        }
        //return Observable.throw(errors);
    }
}