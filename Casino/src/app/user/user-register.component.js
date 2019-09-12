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
var common_1 = require("@angular/common");
var router_2 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/observable/throw");
var UserRegisterComponent = /** @class */ (function () {
    function UserRegisterComponent(userService, route, location, router, formBuilder) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.formBuilder = formBuilder;
        this.messages = [];
    }
    UserRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            if (params['id'] !== undefined) {
                if (params['id'] != "-1") {
                    _this.userService.getUser(params['id'])
                        .subscribe(function (user) { return _this.user = user; }, function (errors) { return _this.handleErrors(errors); });
                }
                else {
                    _this.user = new user_1.User();
                    _this.user.balance = 500;
                }
            }
        });
        this.productForm = this.formBuilder.group({
            mobile: ['', [forms_1.Validators.pattern('[6-9]\\d{9}')]]
        });
        this.user = new user_1.User();
    };
    UserRegisterComponent.prototype.goBack = function () {
        //this.location.back();
        this.router.navigate(['/User/UserList']);
    };
    UserRegisterComponent.prototype.ReturnBack = function (id) {
        //this.location.back();
        alert("Registration Successful! ,Your login id is : " + id);
        this.router.navigate(['/User/UserList']);
    };
    UserRegisterComponent.prototype.updateUser = function (user) {
        var _this = this;
        this.userService.updateUser(user)
            .subscribe(function () { return _this.goBack(); }, function (errors) { return _this.handleErrors(errors); });
    };
    UserRegisterComponent.prototype.addUser = function (user) {
        var _this = this;
        this.userService.addUser(user)
            .subscribe(function (data) {
            var id = data;
            if (data)
                _this.ReturnBack(id);
        }, function (errors) { return _this.handleErrors(errors); });
    };
    UserRegisterComponent.prototype.saveUser = function () {
        if (this.user) {
            if (this.user.id) {
                this.updateUser(this.user);
            }
            else {
                this.addUser(this.user);
            }
        }
    };
    UserRegisterComponent.prototype.handleErrors = function (errors) {
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
        //return Observable.throw(errors);
    };
    UserRegisterComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-register.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.ActivatedRoute,
            common_1.Location,
            router_2.Router,
            forms_1.FormBuilder])
    ], UserRegisterComponent);
    return UserRegisterComponent;
}());
exports.UserRegisterComponent = UserRegisterComponent;
//# sourceMappingURL=user-register.component.js.map