import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { UserSearch } from "./user-search";
import { User } from "./user";
import { Router,ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';


@Component({
    templateUrl: "./user-recharge.component.html"
})
export class UserRechargeComponent implements OnInit {
    constructor(private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute 
        
        
        
        ) {

    }
    public id: string;
    ngOnInit() {
        var self = this;

       // this.id = this.router.snapshot.paramMap.get('id');
        this.activatedRoute.params.subscribe(paramsId => {
            self.id = paramsId.id;
        });
        
        this.user = new User();


    }
    user: User;
    messages: string[] = [];

    goBack() {
       // console.log("Money added ");
        this.router.navigate(['User/UserList']);
    }

    AddMoney(id: string) {
        this.user.uniqueId = this.id;
        console.log(this.user);
       // console.log("id= >" + this.user);
        this.userService.AddMoney(this.user)
            .subscribe(() => this.goBack(),
                errors => this.handleErrors(errors));
    }


   

    private handleErrors(errors: any) {
        this.messages = [];
        for (let msg of errors) {
            this.messages.push(msg);
        }
       
    }
}