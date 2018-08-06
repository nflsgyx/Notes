import { Routes } from "@angular/router";
import { AuthService } from "./auth.service";


import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";



class authRoute{
  let authService:AuthService = new AuthService();
  var redirectAdd = 'signin';
  if (authService.isLoggedIn()){
      redirectAdd = 'logout';
  } else {
      redirectAdd = 'signin';
  }
}


export var AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];
