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
var router_1 = require("@angular/router");
var user_service_1 = require("./user.service");
var user_1 = require("./user");
var roulette_1 = require("./roulette");
var RouletteComponent = /** @class */ (function () {
    function RouletteComponent(userService, router, activatedRoute) {
        this.userService = userService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.messages = [];
    }
    RouletteComponent.prototype.ngOnInit = function () {
        var self = this;
        this.activatedRoute.params.subscribe(function (paramsId) {
            self.id = paramsId.id;
        });
        this.user = new user_1.User();
        this.roulette = new roulette_1.Roulette();
        this.role = sessionStorage.getItem('ID');
        this.name = sessionStorage.getItem('Name');
        this.currentBalance = parseInt(sessionStorage.getItem('Balance'));
        //console.log(this.role);
    };
    RouletteComponent.prototype.goBack = function () {
        // console.log("Money added ");
        //location.reload();
        this.router.navigate(['Roulette/Play', this.id]);
    };
    RouletteComponent.prototype.Home = function () {
        this.router.navigate(['Roulette/Play', this.id]);
    };
    RouletteComponent.prototype.Exit = function () {
        sessionStorage.clear();
        this.router.navigate(['User/Login']);
    };
    RouletteComponent.prototype.AddMoney = function (amount) {
        var _this = this;
        this.user.uniqueId = this.id;
        this.user.balance = amount;
        //console.log(this.user);
        // console.log("id= >" + this.user);
        this.userService.AddMoney(this.user)
            .subscribe(function (data) {
            _this.currentBalance = data.balance;
            _this.goBack();
        }, function (errors) { return _this.handleErrors(errors); });
    };
    RouletteComponent.prototype.ReduceMoney = function (amount) {
        var _this = this;
        this.user.uniqueId = this.id;
        this.user.balance = amount;
        // console.log(this.user);
        // console.log("id= >" + this.user);
        this.userService.RemoveMoney(this.user)
            .subscribe(function (data) {
            _this.currentBalance = data.balance;
            _this.goBack();
        }, function (errors) { return _this.handleErrors(errors); });
    };
    RouletteComponent.prototype.Play = function () {
        var single = this.CheckSingle();
        // var multiple = this.MultipleFive(single);
        //console.log("flag = " + flag);
        if (single) {
            var multiple = this.MultipleFive(single);
            if (multiple) {
                if (confirm("Are you sure to try your luck with current selection? ")) {
                    this.CheckBalance();
                }
            }
            else
                alert("Betting amount must be a multiple of 500.");
        }
        else
            alert("You cannot place multiple bets.");
    };
    RouletteComponent.prototype.CheckSingle = function () {
        var arr = "";
        var value;
        if (this.roulette.one) {
            arr += 1;
            value = this.roulette.one;
        }
        if (this.roulette.two) {
            arr += 2;
            value = this.roulette.two;
        }
        if (this.roulette.three) {
            arr += 3;
            value = this.roulette.three;
        }
        if (this.roulette.four) {
            arr += 4;
            value = this.roulette.four;
        }
        if (this.roulette.five) {
            arr += 5;
            value = this.roulette.five;
        }
        if (this.roulette.zero) {
            arr += 6;
            value = this.roulette.zero;
        }
        if (this.roulette.odd) {
            arr += 7;
            value = this.roulette.odd;
        }
        if (this.roulette.even) {
            arr += 8;
            value = this.roulette.even;
        }
        console.log(arr);
        if (arr.length > 1)
            return false;
        else
            return value;
        console.log(arr.length);
    };
    RouletteComponent.prototype.MultipleFive = function (value) {
        if (value % 500 === 0) {
            return true;
        }
        else
            return false;
    };
    RouletteComponent.prototype.CheckBalance = function () {
        var _this = this;
        this.user.uniqueId = this.id;
        this.userService.CheckBalance(this.user)
            .subscribe(function (data) {
            sessionStorage['Balance'] = data.balance;
            _this.currentBalance = parseInt(sessionStorage.getItem('Balance'));
            if (data) {
                // location.reload();
                console.log(_this.currentBalance);
                if (_this.roulette.one <= _this.currentBalance || _this.roulette.four <= _this.currentBalance ||
                    _this.roulette.two <= _this.currentBalance || _this.roulette.five <= _this.currentBalance ||
                    _this.roulette.three <= _this.currentBalance || _this.roulette.odd <= _this.currentBalance ||
                    _this.roulette.even <= _this.currentBalance || _this.roulette.zero <= _this.currentBalance) {
                    var dice = _this.generateRandomNumber();
                    //    console.log(dice);
                    _this.validateDice(dice);
                }
                else
                    alert("You dont have enough credit to bet");
            }
        }, function (errors) { return _this.handleErrors(errors); });
        //  console.log("current balance  " +this. user.balance);
    };
    RouletteComponent.prototype.validateDice = function (dice) {
        if (this.roulette.one) {
            if (this.currentBalance >= this.roulette.one) {
                if ((dice <= 12) && (dice >= 1)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.one + " play again?");
                    this.ReduceMoney(this.roulette.one);
                }
            }
            else
                alert("You dont have enough credit to bet");
        }
        if (this.roulette.two) {
            if (this.currentBalance >= this.roulette.two) {
                if ((dice <= 24) && (dice >= 13)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.two + " play again?");
                    this.ReduceMoney(this.roulette.two);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.three) {
            if (this.currentBalance >= this.roulette.three) {
                if ((dice <= 36) && (dice >= 25)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.three + " play again?");
                    this.ReduceMoney(this.roulette.three);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.four) {
            if (this.currentBalance >= this.roulette.four) {
                if ((dice <= 18) && (dice >= 1)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.four + " play again?");
                    this.ReduceMoney(this.roulette.four);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.five) {
            if (this.currentBalance >= this.roulette.five) {
                if ((dice <= 36) && (dice >= 19)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.five + " play again?");
                    this.ReduceMoney(this.roulette.five);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.zero) {
            if (this.currentBalance >= this.roulette.zero) {
                if ((dice === 0)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.zero + " play again?");
                    this.ReduceMoney(this.roulette.zero);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.odd) {
            if (this.currentBalance >= this.roulette.odd) {
                if ((dice % 2 != 0)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.odd + " play again?");
                    this.ReduceMoney(this.roulette.odd);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
        if (this.roulette.even) {
            if (this.currentBalance >= this.roulette.even) {
                if ((dice % 2 == 0)) {
                    this.getBet(dice);
                }
                else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.even + " play again?");
                    this.ReduceMoney(this.roulette.even);
                }
            }
            else
                alert("You dont have enough credit to bet.");
        }
    };
    RouletteComponent.prototype.getBet = function (dice) {
        var amount = 0;
        var bet = this.roulette;
        if (this.roulette.one && (dice <= 12) && (dice >= 1)) {
            amount = this.roulette.one * 1.5;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here one " + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.two && (dice <= 24) && (dice >= 13)) {
            amount = this.roulette.two * 1.5;
            if (confirm("Roulette result is " + dice + "Congracts you won " + amount + " play again?")) {
                console.log("here two " + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.three && (dice <= 36) && (dice >= 25)) {
            amount = this.roulette.three * 1.5;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here even" + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.four && (dice <= 18) && (dice >= 1)) {
            amount = this.roulette.four * 1.25;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here four " + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.five && (dice <= 36) && (dice >= 19)) {
            amount = this.roulette.five * 1.25;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here five " + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.zero && (dice === 0)) {
            amount = this.roulette.zero * 10;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here even " + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.odd && (dice % 2 != 0)) {
            amount = this.roulette.odd * 1.25;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here odd" + amount);
                this.AddMoney(amount);
            }
        }
        if (this.roulette.even && (dice % 2 == 0)) {
            amount = this.roulette.even * 1.25;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here even" + amount);
                this.AddMoney(amount);
            }
        }
        return amount;
    };
    RouletteComponent.prototype.getRandomIntUptoTen = function () {
        var i = Math.floor(Math.random() * 10) + 1;
        return this.getRandomUptoN(i);
    };
    RouletteComponent.prototype.getRandomUptoN = function (number) {
        var n = number;
        return Math.floor(Math.pow(10, n - 1) + Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1) - 1));
    };
    RouletteComponent.prototype.generateRandomNumber = function () {
        var s = "";
        for (var i = 0; i < 20; i++) {
            s = s + this.getRandomIntUptoTen();
        }
        var n = s;
        //console.log("n== "+ n);
        var arr = ('' + n).split('').map(function (digit) { return +digit; });
        var sorted = (arr).sort();
        var even = 0;
        var odd = 0;
        if ((sorted.length - 1) % 2 === 0) {
            for (var i = 0; i <= sorted.length - 1; i++) {
                if (i <= ((sorted.length - 1) / 2)) {
                    even = even + sorted[i];
                }
                else {
                    odd = odd + sorted[i];
                }
            }
        }
        else {
            for (var i = 0; i <= sorted.length - 1; i++) {
                if (i <= ((sorted.length) / 2)) {
                    even = even + sorted[i];
                }
                else {
                    odd = odd + sorted[i];
                }
            }
        }
        return (odd - even) % 37;
    };
    RouletteComponent.prototype.handleErrors = function (errors) {
        this.messages = [];
        for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
            var msg = errors_1[_i];
            this.messages.push(msg);
        }
    };
    RouletteComponent = __decorate([
        core_1.Component({
            templateUrl: "./user-roulette.component.html"
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            router_1.Router,
            router_1.ActivatedRoute])
    ], RouletteComponent);
    return RouletteComponent;
}());
exports.RouletteComponent = RouletteComponent;
//# sourceMappingURL=user-roulette.component.js.map