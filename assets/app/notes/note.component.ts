import { Component, Input } from "@angular/core";

import { Note } from "./note.model";
import { NoteService } from "./note.service";

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css']
})
export class NoteComponent {
    @Input() note: Note;

    constructor(private noteService: NoteService) {}

    onEdit() {
        this.noteService.editNote(this.note);
    }

    onSharedChange(){
      console.log("*",this.note.isShared);
      this.noteService.updateNote(this.note)
          .subscribe(
              result => console.log(result)
          );
    }

    onDelete() {
        this.noteService.deleteNote(this.note)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.note.userId;
    }
}
