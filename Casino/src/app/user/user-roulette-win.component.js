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
var RouletteWinComponent = /** @class */ (function () {
    function RouletteWinComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.messages = [];
    }
    RouletteWinComponent.prototype.ngOnInit = function () {
        this.user = new user_1.User();
        this.role = "";
    };
    RouletteWinComponent.prototype.goBack = function (user) {
        console.log("Logged in hehe ");
        console.log(sessionStorage);
        this.router.navigate(['Roulette/Play', user]);
        //this.router.navigate(['User/UserList']);
    };
    RouletteWinComponent.prototype.handleErrors = function (errors) {
        this.messages = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    RouletteWinComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-roulette-win.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router])
    ], RouletteWinComponent);
    return RouletteWinComponent;
}());
exports.RouletteWinComponent = RouletteWinComponent;
//# sourceMappingURL=user-roulette-win.component.js.map