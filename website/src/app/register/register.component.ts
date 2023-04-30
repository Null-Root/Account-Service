import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component } from '@angular/core';
import { AccountModel } from 'src/models';
import { generalValidation } from 'src/utility';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	first_name: string = "";
	last_name: string = "";
	date_of_birth!: Date;
	email: string = "";
	password: string = "";

	constructor(private http: HttpClient) {}

	register() {
		if(!generalValidation( [this.first_name, this.last_name, this.date_of_birth, this.email, this.password] )) {
			return;
		}

		// Make Object
		const account: AccountModel = new AccountModel();
		account.first_name = this.first_name;
		account.last_name = this.last_name;
		account.date_of_birth = this.date_of_birth;
		account.email = this.email;
		account.password = this.password;

		// Make Request
		this.http.post('http://localhost:9000/account-service/v1/register', account).subscribe({
			next: (response: any) => {
				window.alert(response.description);
			},
			error: (error) => {
				window.alert(error.error.description);
			}
		});
	}
}
