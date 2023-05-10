import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountModel } from "src/models";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    API_REGISTER_LINK = "http://localhost:9000/account-service/v1/register";
    API_LOGIN_LINK = "http://localhost:9000/account-service/v1/login"

    constructor(private http: HttpClient) {}

    public sendRegisterAccount(accountModel: AccountModel) {
        return this.http.post(this.API_REGISTER_LINK, accountModel);
    }

    public sendLoginAccount(accountModel: AccountModel) {
        return this.http.post(this.API_LOGIN_LINK, accountModel);
    }
};