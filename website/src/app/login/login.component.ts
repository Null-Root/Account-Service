import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AccountModel } from 'src/models';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	email!: string;
	password!: string;

	constructor(private http: HttpClient, private cookieService: CookieService) { }

	login() {
		// Make Object
		const account: AccountModel = new AccountModel();
		account.email = this.email;
		account.password = this.password;

		// Make Request
		this.http.post('http://localhost:9000/account-service/v1/login', account).subscribe({
			next: (response: any) => {
				window.alert(response.description);

				// Set Cookie
				this.cookieService.set( 'email', account.email );
				this.cookieService.set( 'user_token', response.payload );
			},
			error: (error) => {
				window.alert(error.error.description);
			}
		});
	}
}
