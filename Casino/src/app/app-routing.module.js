"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_list_component_1 = require("./user/user-list.component");
var user_register_component_1 = require("./user/user-register.component");
var user_login_component_1 = require("./user/user-login.component");
var user_recharge_component_1 = require("./user/user-recharge.component");
var user_roulette_component_1 = require("./user/user-roulette.component");
var app_component_1 = require("./app.component");
var user_roulette_win_component_1 = require("./user/user-roulette-win.component");
var routes = [
    {
        path: 'Roulette/Play/:id',
        component: user_roulette_component_1.RouletteComponent
    },
    {
        path: 'Roulette/Win',
        component: user_roulette_win_component_1.RouletteWinComponent
    },
    {
        path: 'User/UserList',
        component: user_list_component_1.UserListComponent
    },
    {
        path: 'User/RechargeUser/:id',
        component: user_recharge_component_1.UserRechargeComponent
    },
    {
        path: 'userList',
        component: user_list_component_1.UserListComponent
    },
    {
        path: 'userRegister/:id',
        component: user_register_component_1.UserRegisterComponent
    },
    {
        path: 'User/Register',
        redirectTo: 'userRegister/-1'
    },
    {
        path: 'User/Index',
        redirectTo: 'userList'
    },
    {
        path: 'User/Login',
        component: user_login_component_1.UserLoginComponent
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            bootstrap: [app_component_1.AppComponent],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map