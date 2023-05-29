import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ALLOWED_REDIRECTS } from 'src/consts';
import { ApiService } from 'src/services';
import { sleep } from 'src/utility';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
	nextLink: string;

	logout_content: string;
	show_loader: boolean = true;

	constructor(
		private apiService: ApiService,
		private cookieService: CookieService,
		private route: ActivatedRoute
	) {
		this.nextLink = "";
		this.logout_content = "Logging out. Please wait...";
		this.show_loader = true;
	}

	async ngOnInit(): Promise<void> {
		this.route.queryParams.subscribe({
			next: (params) => {
				// Get "nextLink"
				// If none, set to empty string
				if (params.hasOwnProperty('nextLink')) this.nextLink = params['nextLink'];
				else this.nextLink = "";

				// Check If Link Provided is in Allowed External Redirects list, Set to empty string if none
				if (this.nextLink == "" || !ALLOWED_REDIRECTS.includes(this.nextLink!)) {
					this.nextLink = "";
				}
			}
		});

		await sleep(1200);
		this.logoutAccount();
	}

	logoutAccount() {
		// Logout
		const email = this.cookieService.get('email');
		const token = this.cookieService.get('user_token');

		const data = {
			email: email,
			token: token
		}

		const observable_data = this.apiService.sendLogoutAccount(data);

		observable_data.subscribe({
			next: async (response: any) => {
				this.show_loader = false;
				this.logout_content = response.description;

				await sleep(1200);

				window.location.href = this.nextLink;

				// Set Cookie
				this.cookieService.deleteAll();
			},
			error: async (error: any) => {
				this.show_loader = false;
				this.logout_content = "Error Occurred!";

				await sleep(1200);
				
				window.location.href = this.nextLink;
			}
		});
	}
}
