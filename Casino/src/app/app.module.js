"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./user/user.service");
var user_list_component_1 = require("./user/user-list.component");
var user_register_component_1 = require("./user/user-register.component");
var user_login_component_1 = require("./user/user-login.component");
var user_recharge_component_1 = require("./user/user-recharge.component");
var user_roulette_component_1 = require("./user/user-roulette.component");
var user_roulette_win_component_1 = require("./user/user-roulette-win.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [user_list_component_1.UserListComponent, user_register_component_1.UserRegisterComponent,
                user_login_component_1.UserLoginComponent, app_component_1.AppComponent, user_recharge_component_1.UserRechargeComponent,
                user_roulette_component_1.RouletteComponent, user_roulette_win_component_1.RouletteWinComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [user_service_1.UserService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map