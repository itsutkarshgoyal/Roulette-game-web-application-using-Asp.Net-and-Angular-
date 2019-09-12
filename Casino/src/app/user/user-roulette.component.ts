import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./user.service";
import { User } from "./user";
import { Roulette } from "./roulette";
import { type } from "os";


@Component({
    templateUrl: "./user-roulette.component.html"
})
export class RouletteComponent implements OnInit {
    constructor(private userService: UserService,
        private router: Router,
        private activatedRoute: ActivatedRoute ) {

    }
    ngOnInit() {
        var self = this;
        this.activatedRoute.params.subscribe(paramsId => {
            self.id = paramsId.id;
        });
        this.user = new User();
        this.roulette = new Roulette();
        this.role = sessionStorage.getItem('ID');
        this.name = sessionStorage.getItem('Name');
        this.currentBalance = parseInt(sessionStorage.getItem('Balance'));
        
        //console.log(this.role);
    }
    public id: string;
    user: User ;
    roulette: Roulette;
    messages: string[] = [];
    role: string;
    myData: any;
    currentBalance: number;
    name: string;
    
    goBack() {
        // console.log("Money added ");
        //location.reload();
        this.router.navigate(['Roulette/Play',this.id]);
    }
    Home() {
        this.router.navigate(['Roulette/Play', this.id]);
    }
    Exit() {
        sessionStorage.clear();

        this.router.navigate(['User/Login']);
    }
    
    AddMoney(amount: number) {
        this.user.uniqueId = this.id;
        this.user.balance = amount;
        //console.log(this.user);
        // console.log("id= >" + this.user);
        this.userService.AddMoney(this.user)
            .subscribe((data: User) => {
                this.currentBalance = data.balance;
                this.goBack();
            },
                errors => this.handleErrors(errors));
    }

    ReduceMoney(amount: number) {
        this.user.uniqueId = this.id;
        this.user.balance = amount;
       // console.log(this.user);
        // console.log("id= >" + this.user);
        this.userService.RemoveMoney(this.user)
            .subscribe((data: User) => {
                this.currentBalance = data.balance;
                this.goBack();
            },
                errors => this.handleErrors(errors));
    }
    Play() {
        var single = this.CheckSingle();
       // var multiple = this.MultipleFive(single);
        //console.log("flag = " + flag);
        if (single) {
            var multiple = this.MultipleFive(single);
            if (multiple) {
                if (confirm("Are you sure to try your luck with current selection? ")) {
                    this.CheckBalance();
                }
            } else alert("Betting amount must be a multiple of 500.");
        } else alert("You cannot place multiple bets.");
      
    }
    CheckSingle() {
        var arr = ""; var value;
        if (this.roulette.one) {
            arr += 1; value = this.roulette.one;
        }
        if (this.roulette.two) {
            arr += 2; value = this.roulette.two;
        }
        if (this.roulette.three) {
            arr += 3; value = this.roulette.three;
        }
        if (this.roulette.four) {
            arr += 4; value = this.roulette.four;
        }
        if (this.roulette.five) {
            arr += 5; value = this.roulette.five;
        }
        if (this.roulette.zero) {
            arr += 6; value = this.roulette.zero;
        }
        if (this.roulette.odd) {
            arr += 7; value = this.roulette.odd;
        }
        if (this.roulette.even) {
            arr += 8; value = this.roulette.even;
        }
        console.log(arr);
        if (arr.length > 1)
            return false;
        else return value;
        console.log(arr.length);
    }

    MultipleFive(value: number) {
       
        if (value % 500 === 0) {
            return true;
        } else return false;
 
    }
    CheckBalance() {
        this.user.uniqueId = this.id;
        this.userService.CheckBalance(this.user)
            .subscribe((data: User) => {
                sessionStorage['Balance'] = data.balance;
                this.currentBalance = parseInt(sessionStorage.getItem('Balance'));
                if (data) {
                   // location.reload();
                    console.log(this.currentBalance);
                    if (this.roulette.one <= this.currentBalance || this.roulette.four <= this.currentBalance ||
                        this.roulette.two <= this.currentBalance || this.roulette.five <= this.currentBalance ||
                        this.roulette.three <= this.currentBalance || this.roulette.odd <= this.currentBalance ||
                        this.roulette.even <= this.currentBalance || this.roulette.zero <= this.currentBalance) {
                        var dice = this.generateRandomNumber();
                        //    console.log(dice);
                        this.validateDice(dice);
                    } else alert("You dont have enough credit to bet");
                    
                }
               
            },
            errors => this.handleErrors(errors));
       
        
       
      //  console.log("current balance  " +this. user.balance);
    }
  
    validateDice(dice:number) {
        if (this.roulette.one) {
            if (this.currentBalance >= this.roulette.one) {
                if ((dice <= 12) && (dice >= 1)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.one + " play again?");
                    this.ReduceMoney(this.roulette.one);
                }
            } else alert("You dont have enough credit to bet");
        }
        if (this.roulette.two) {
            if (this.currentBalance >= this.roulette.two) {
                if ((dice <= 24) && (dice >= 13)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.two + " play again?");
                    this.ReduceMoney(this.roulette.two);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.three) {
            if (this.currentBalance >= this.roulette.three) {
                if ((dice <= 36) && (dice >= 25)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.three + " play again?");
                    this.ReduceMoney(this.roulette.three);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.four) {
            if (this.currentBalance >= this.roulette.four) {
                if ((dice <= 18) && (dice >= 1)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.four + " play again?");
                    this.ReduceMoney(this.roulette.four);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.five) {
            if (this.currentBalance >= this.roulette.five) {
                if ((dice <= 36) && (dice >= 19)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.five + " play again?");
                    this.ReduceMoney(this.roulette.five);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.zero) {
            if (this.currentBalance >= this.roulette.zero) {
                if ((dice === 0)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.zero + " play again?");
                    this.ReduceMoney(this.roulette.zero);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.odd) {
            if (this.currentBalance >= this.roulette.odd) {
                if ((dice % 2 != 0)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.odd + " play again?");
                    this.ReduceMoney(this.roulette.odd);
                }
            } else alert("You dont have enough credit to bet.");
        }
        if (this.roulette.even) {
            if (this.currentBalance>= this.roulette.even) {
                if ((dice % 2 == 0)) {
                    this.getBet(dice);
                } else {
                    alert("Roulette result is " + dice + " You lost " + this.roulette.even + " play again?");
                    this.ReduceMoney(this.roulette.even);
                }
            } else alert("You dont have enough credit to bet.");
        }
    
    }
    getBet(dice:number) {
        var amount = 0;
        var bet = this.roulette;
        if (this.roulette.one && (dice <=12) && (dice >=1)) {
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
        if (this.roulette.odd && (dice %2!=0)) {
            amount = this.roulette.odd * 1.25;
            if (confirm("Roulette result is " + dice + " Congracts you won " + amount + " play again?")) {
                console.log("here odd" + amount);
                this.AddMoney(amount);
            }

        }
        if (this.roulette.even && (dice%2==0)) {
            amount = this.roulette.even * 1.25;

            if (confirm("Roulette result is " + dice +" Congracts you won " + amount + " play again?")) {
                console.log("here even" + amount);
                this.AddMoney(amount);
            }
           
        }
        return amount;
    }
   
    getRandomIntUptoTen() {
        var i = Math.floor(Math.random() * 10) + 1;
        return this.getRandomUptoN(i);
    }

    getRandomUptoN(number: number) {
    var n = number;
    return Math.floor(Math.pow(10, n - 1) + Math.random() * (Math.pow(10, n) - Math.pow(10, n - 1) - 1));
    }

    generateRandomNumber() {
        var s = "";
        for ( var i = 0; i < 20; i++)
        {
             s = s + this.getRandomIntUptoTen();

        }
        var n = s; 
        //console.log("n== "+ n);
        var arr = ('' + n).split('').map(function (digit) { return +digit; });
        var sorted = (arr).sort();
        var even = 0;
        var odd = 0;
        if ((sorted.length - 1) % 2 === 0)
        {
            for (var i = 0; i <= sorted.length - 1; i++) {
                if (i <= ((sorted.length - 1) / 2)) {
                    even = even + sorted[i];
                } else {
                    odd = odd + sorted[i];
                }
            }
        } else
        {
            for (var i = 0; i <= sorted.length - 1; i++) {
                if (i <= ((sorted.length) / 2)) {
                    even = even + sorted[i];
                } else {
                    odd = odd + sorted[i];
                }
            }
        }       
        return (odd-even)%37;
    }
    private handleErrors(errors: any) {
        this.messages = [];
        for (let msg of errors) {
            this.messages.push(msg);
        }
    }
}