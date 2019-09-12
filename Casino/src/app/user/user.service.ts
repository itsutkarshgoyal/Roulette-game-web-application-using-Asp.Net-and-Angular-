import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from "./user";
import { UserSearch } from "./user-search";

@Injectable()
export class UserService {

    private url = "/api/userApi";
    private url2 = "/api/LoginApi";
    constructor(private http: Http) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get(this.url).map(this.extractData)
            .catch(this.handleErrors);
       
    }

    getUser(id: number): Observable<User> {
        let url = this.url + "/" + id;
        return this.http.get(url).map(this.extractData)
            .catch(this.handleErrors);
    }

    Login(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+"/Login",
            user, options)
            .map(this.extractData)
            .catch(this.handleErrors);
    }

    AddMoney(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+"/Recharge",
            user, options).map(this.extractData)
            .catch(this.handleErrors);
    }

    RemoveMoney(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + "/Reduce",
            user, options).map(this.extractData)
            .catch(this.handleErrors);
    }

    CheckBalance(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + "/Check",
            user, options).map(this.extractData)
            .catch(this.handleErrors);
    }

    search(searchEntity: UserSearch): Observable<User[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url + "/Search",
            searchEntity, options).map(this.extractData)
            .catch(this.handleErrors);
    }
    addUser(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.url+"/SaveUser", user, options)
            .map(this.extractData)
            .catch(this.handleErrors);

    }

    updateUser(user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.url + "/" + user.id,
            user, options)
            .map(()=>this.extractData)
            .catch(this.handleErrors);

    }

    deleteUser(id: number): Observable<User> {
        return this.http.delete(this.url + "/" + id)
            .map(() => null)
            .catch(this.handleErrors);
    }

    private extractData(res: Response) {
       // console.log(res);
        let body = res.json();
        return body || {};
    }

    private handleErrors(error: any): Observable<any>
    {
        var errors: string[] = [];
        switch (error.status)
        {
            case 400: //Bad Request
                let err = error.json();
                if (err.modelState) {
                    let valErrors = error.json().modelState;
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
        };

        console.error("An error occurred", errors);
        
        return Observable.throw(errors);
    } 

}







