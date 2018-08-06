import { Component, Input } from "@angular/core";
import { PdfService } from "../pdf/pdf.service";

@Component({
    selector: 'app-notes',
    template: `
        <div class="row">
            <app-note-list></app-note-list>
        </div>
    `
})
export class NotesComponent {
  pageNum:Number;
  fileName:String;
}
