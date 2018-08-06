import { Routes, RouterModule } from "@angular/router";

import { NotesComponent } from "./notes/notes.component";
import { MynotesComponent} from "./notes/mynotes.component";

export const NOTE_ROUTES: Routes = [
    { path: 'sharednotes/:id', component: NotesComponent },
    { path: 'sharednotes', component: NotesComponent, pathMatch: 'full'},
    { path: 'mynotes', component: MynotesComponent },
    { path: '', redirectTo: 'sharednotes', pathMatch: 'full' }
];
