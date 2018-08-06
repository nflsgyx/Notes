import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { UiSwitchModule } from 'ng2-ui-switch';

import { AppComponent } from "./app.component";
import { NoteTakingComponent } from "./notetaking.component"
import { NoteComponent } from "./notes/note.component";
import { NoteListComponent } from "./notes/note-list.component";
import { NoteInputComponent } from "./notes/note-input.component";
import { NotesComponent } from "./notes/notes.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { FileService} from "./files/file.service";
import { PdfComponent} from "./pdf/pdfviewer.component";
import { UploadComponent} from "./files/upload.component";
import { MynoteComponent} from "./notes/mynote.component";
import { MynotesComponent} from "./notes/mynotes.component";
import { MynoteListComponent} from "./notes/mynote-list.component";
import { CatalogComponent } from "./files/catalog.component";
import { FileListComponent } from "./files/file-list.component";
import { FileComponent } from "./files/file.component";
import { HomeComponent } from "./home.component";
import { MarkdownComponent } from "./markdown/markdown.component";

@NgModule({
    declarations: [
        AppComponent,
        NoteTakingComponent,
        NoteComponent,
        NoteListComponent,
        NoteInputComponent,
        NotesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent,
        PdfComponent,
        UploadComponent,
        MynoteComponent,
        MynotesComponent,
        MynoteListComponent,
        CatalogComponent,
        FileListComponent,
        FileComponent,
        HomeComponent,
        MarkdownComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        PdfViewerModule,
        CommonModule,
        FileUploadModule,
        UiSwitchModule,
    ],
    providers: [AuthService, ErrorService, FileService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
