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
var UserRechargeComponent = /** @class */ (function () {
    function UserRechargeComponent(userService, router, activatedRoute) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.messages = [];
    }
    UserRechargeComponent.prototype.ngOnInit = function () {
        var self = this;
        // this.id = this.router.snapshot.paramMap.get('id');
        this.activatedRoute.params.subscribe(function (paramsId) {
            self.id = paramsId.id;
        });
        this.user = new user_1.User();
    };
    UserRechargeComponent.prototype.goBack = function () {
        // console.log("Money added ");
        this.router.navigate(['User/UserList']);
    };
    UserRechargeComponent.prototype.AddMoney = function (id) {
        var _this = this;
        this.user.uniqueId = this.id;
        console.log(this.user);
        // console.log("id= >" + this.user);
        this.userService.AddMoney(this.user)
            .subscribe(function () { return _this.goBack(); }, function (errors) { return _this.handleErrors(errors); });
    };
    UserRechargeComponent.prototype.handleErrors = function (errors) {
        this.messages = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    UserRechargeComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-recharge.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], UserRechargeComponent);
    return UserRechargeComponent;
}());
exports.UserRechargeComponent = UserRechargeComponent;
//# sourceMappingURL=user-recharge.component.js.map