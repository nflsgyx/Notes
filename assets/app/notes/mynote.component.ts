import { Component, Input } from "@angular/core";

import { Note} from "./note.model";
import { NoteService } from "./note.service";

@Component({
    selector: 'app-mynote',
    templateUrl: './mynote.component.html',
    styleUrls: ['./mynote.component.css']
})
export class MynoteComponent implements OnInit{
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
