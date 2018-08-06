import { Component, OnInit } from "@angular/core";
import { Note } from "./note.model";
import { NoteService } from "./note.service";
import { PdfService } from "../pdf/pdf.service";
import { Subscription }  from 'rxjs';

@Component({
    selector: 'app-note-list',
    template: `
        <div class="col-md-10 col-md-offset-2" style="height:480px; overflow-y: auto;">
            <app-note
                   [note]="note"
                    *ngFor="let note of notes"></app-note>
        </div>

    `
})
export class NoteListComponent implements OnInit {
    notes: Note[];
    pageNum : Number;
    fileName: String;
    subscription: Subscription;

    constructor(private noteService: NoteService, private pdfService: PdfService) {
      this.fileName = this.pdfService.fileName;
      console.log("fileName", this.fileName);
      this.subscription = pdfService.pageNumAnnounced$.subscribe(
        pageNum => {
          this.noteService.getNotes(this.fileName,pageNum)
              .subscribe(
                  (notes: Note[]) => {
                      console.log("my-note-1",this.pdfService.page);
                      this.notes = notes;
                  }
              );
      });
      this.noteService.getNotes(this.fileName,this.pdfService.page)
          .subscribe(
              (notes: Note[]) => {
                  console.log("my-note",this.pdfService.page);
                  this.notes = notes;
              }
          );
    }
}
