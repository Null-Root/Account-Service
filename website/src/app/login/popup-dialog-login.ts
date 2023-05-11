import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/services';

@Component({
    selector: 'popup-dialog-login',
    templateUrl: './popup-dialog-login.html',
    styleUrls: ['./popup-dialog-login.scss']
})
export class PopupDialogLogin implements OnInit {
    dialog_content: string | undefined;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<PopupDialogLogin>,
        private apiService: ApiService,
        private cookieService: CookieService
    ) {
        this.dialog_content = "Executing Action, Please Wait...";
    }

    ngOnInit(): void {
        const { accountModel, nextLink } = this.data;

        const observable_data = this.apiService.sendLoginAccount(accountModel);

        observable_data.subscribe({
            next: (response: any) => {
                this.dialog_content = response.description;
                window.location.href = nextLink;

                // Set Cookie
				this.cookieService.set( 'email', accountModel.email );
				this.cookieService.set( 'user_token', response.payload );
            },
            error: (error: any) => {
                this.dialog_content = "Error Occurred! ";
                this.dialog_content += error.error.description;
            }
        });
    }
}