import { Routes, RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./auth/authentication.component";
import { NoteTakingComponent } from "./notetaking.component";
import { CatalogComponent } from "./files/catalog.component";
import { HomeComponent } from "./home.component";
import { NOTE_ROUTES } from "./notetaking.routes";
import { AUTH_ROUTES } from "./auth/auth.routes";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'catalog', component: CatalogComponent },
    { path: 'notetaking',component:NoteTakingComponent,children: NOTE_ROUTES},
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    { path: '**', redirectTo:'notetaking'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
