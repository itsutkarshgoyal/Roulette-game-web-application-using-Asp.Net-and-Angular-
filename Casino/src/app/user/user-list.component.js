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
var user_search_1 = require("./user-search");
var router_1 = require("@angular/router");
require("rxjs/add/observable/throw");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.users = [];
        this.messages = [];
        this.searchEntity = new user_search_1.UserSearch();
    }
    UserListComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UserListComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) { return _this.users = users; }, function (errors) { return _this.handleErrors(errors); });
    };
    UserListComponent.prototype.Home = function () {
        this.router.navigate(['User/Index']);
    };
    UserListComponent.prototype.LoginUser = function () {
        this.router.navigate(['User/Login']);
    };
    UserListComponent.prototype.UserList = function () {
        this.router.navigate(['User/UserList']);
    };
    UserListComponent.prototype.add = function () {
        this.router.navigate(['/userRegister', -1]);
    };
    UserListComponent.prototype.search = function () {
        var _this = this;
        this.userService.search(this.searchEntity)
            .subscribe(function (users) { return _this.users = users; }, function (errors) { return _this.handleErrors(errors); });
    };
    UserListComponent.prototype.Recharge = function (id) {
        console.log(id);
        this.router.navigate(['User/RechargeUser', id]);
    };
    UserListComponent.prototype.deleteUser = function (id) {
        var _this = this;
        if (confirm("Delete this product??")) {
            this.userService.deleteUser(id)
                .subscribe(function () { return _this.getUsers(); }, function (errors) { return _this.handleErrors(errors); });
        }
    };
    UserListComponent.prototype.handleErrors = function (errors) {
        this.messages = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    UserListComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-list.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router])
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map