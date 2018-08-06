import { Component, OnInit } from "@angular/core";

import { Note } from "./note.model";
import { NoteService } from "./note.service";
import { Router } from "@angular/router";
import { PdfService } from "../pdf/pdf.service";
import { Subscription }  from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-mynote-list',
    template: `
        <div class="col-md-10 col-md-offset-2"
          style="overflow-y:auto; height:480px;">
            <app-mynote
                   [note]="note"
                    *ngFor="let note of notes"></app-mynote>
        </div>
    `
})
export class MynoteListComponent{
    notes: Note[];
    pageNum : Number;
    fileName: String;
    subscription: Subscription;

    constructor(private noteService: NoteService, private router: Router, private pdfService: PdfService,private authService:AuthService) {
      this.fileName = this.pdfService.fileName;
      console.log("fileName", this.fileName);
      this.subscription = pdfService.pageNumAnnounced$.subscribe(
        pageNum => {
          if (this.authService.isLoggedIn()){
            this.noteService.getMyNotes(this.fileName,pageNum)
                .subscribe(
                    (notes: Note[]) => {
                        console.log("my-note-1",this.pdfService.page);
                        this.notes = notes;
                    }
                );
          }
      });

      this.noteService.getMyNotes(this.fileName,this.pdfService.page)
          .subscribe(
              (notes: Note[]) => {
                  console.log("my-note",this.pdfService.page);
                  this.notes = notes;
              }
              err=>{
                setTimeout(() =>
                {
                    this.router.navigateByUrl('/auth');
                },
                2000);
              }
          );
    }
}