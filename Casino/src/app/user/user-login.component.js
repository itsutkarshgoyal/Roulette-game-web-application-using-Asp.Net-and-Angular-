"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("./user.service");
var user_1 = require("./user");
var router_1 = require("@angular/router");
require("rxjs/add/observable/throw");
var UserLoginComponent = /** @class */ (function () {
    function UserLoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.messages = [];
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
    };
    UserLoginComponent.prototype.goBack = function (id) {
        console.log("Logged in hehe ");
        console.log(sessionStorage);
        this.role = sessionStorage.getItem('ID');
        console.log(this.role);
        this.router.navigate(['Roulette/Play', id]);
        //this.router.navigate(['User/UserList']);
    };
    UserLoginComponent.prototype.Home = function () {
        this.router.navigate(['User/Index']);
    };
    UserLoginComponent.prototype.LoginUser = function () {
        this.router.navigate(['User/Login']);
    };
    UserLoginComponent.prototype.UserList = function () {
        this.router.navigate(['User/UserList']);
    };
    UserLoginComponent.prototype.Login = function () {
        var _this = this;
        this.userService.Login(this.user)
            .subscribe(function (data) {
            sessionStorage['ID'] = data.uniqueID;
            sessionStorage['Name'] = data.name;
            sessionStorage['Balance'] = data.balance;
            // console.log(sessionStorage.getItem('ID'));
            if (data) {
                _this.goBack(_this.user.uniqueId);
            }
            else {
                alert("Wrong Credentials");
            }
        }, function (errors) { return _this.handleErrors(errors); });
    };
    UserLoginComponent.prototype.handleErrors = function (errors) {
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
        //return Observable.throw(errors);
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-login.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login.component.js.map