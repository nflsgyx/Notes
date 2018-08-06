import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

@Component({
    selector: 'app-authentication',
    styleUrls:['../reset.css','./authentication.component.css'],
    templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
    constructor(private authService: AuthService) {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}
