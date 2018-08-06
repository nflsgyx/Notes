import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";

import { NoteService } from "./note.service";
import { PdfService } from "../pdf/pdf.service";
import { Note } from "./note.model";

@Component({
    selector: 'app-note-input',
    templateUrl: './note-input.component.html',
    styleUrls:['./note-input.component.css']
})
export class NoteInputComponent implements OnInit {
    note: Note;
    @Input() fileName: String;
    @Input() pageNum: Number;

    constructor(private noteService: NoteService, private pdfService:PdfService) {}

    onSubmit(form: NgForm) {
        if (this.note) {
            this.note.content = form.value.content;
            this.noteService.updateNote(this.note)
                .subscribe(
                    result => console.log(result)
                );
            this.note = null;
        } else {
            console.log("add",this.pdfService.fileName,this.pdfService.page);
            const note = new Note(form.value.content,true,this.pdfService.fileName,this.pdfService.page);
            console.log("ADD note:",note);
            this.noteService.addNote(note)
                .subscribe(
                    data => console.log(data),
                    // error => console.error(error)
                );
        }
        form.resetForm();
    }

    onClear(form: NgForm) {
        this.note = null;
        form.resetForm();
    }

    ngOnInit() {
        this.noteService.noteIsEdit.subscribe(
            (note: Note) => this.note = note
        );
    }
}
