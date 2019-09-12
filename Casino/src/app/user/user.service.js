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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = "/api/userApi";
        this.url2 = "/api/LoginApi";
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.url).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.getUser = function (id) {
        var url = this.url + "/" + id;
        return this.http.get(url).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.Login = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/Login", user, options)
            .map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.AddMoney = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/Recharge", user, options).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.RemoveMoney = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/Reduce", user, options).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.CheckBalance = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/Check", user, options).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.search = function (searchEntity) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/Search", searchEntity, options).map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.addUser = function (user) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url + "/SaveUser", user, options)
            .map(this.extractData)
            .catch(this.handleErrors);
    };
    UserService.prototype.updateUser = function (user) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.url + "/" + user.id, user, options)
            .map(function () { return _this.extractData; })
            .catch(this.handleErrors);
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete(this.url + "/" + id)
            .map(function () { return null; })
            .catch(this.handleErrors);
    };
    UserService.prototype.extractData = function (res) {
        // console.log(res);
        var body = res.json();
        return body || {};
    };
    UserService.prototype.handleErrors = function (error) {
        var errors = [];
        switch (error.status) {
            case 400: //Bad Request
                var err = error.json();
                if (err.modelState) {
                    var valErrors = error.json().modelState;
                    for (var key in valErrors) {
                        for (var i = 0; i < valErrors[key].length; i++) {
                            errors.push(valErrors[key][i]);
                        }
                    }
                }
                else if (err.message) {
                    errors.push(err.message);
                }
                else {
                    errors.push("An Unknown error occurred.");
                }
                break;
            case 404: //Not Found 
                errors.push("Wrong Credentials UserId Doesnot Exists");
                alert("Wrong Credentials UserId Doesnot Exists");
                break;
            case 500: //Internal Error
                errors.push(error.json().exceptionMessage);
                break;
            case 406: //Not Acceptable Error
                break;
            default:
                errors.push("Status: " + error.status + " -Error Message: "
                    + error.statusText);
                break;
        }
        ;
        console.error("An error occurred", errors);
        return Observable_1.Observable.throw(errors);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map