import { Component } from "@angular/core";
import { PdfService } from "../pdf/pdf.service";

@Component({
    selector: 'app-mynotes',
    template: `
        <div class="row">
            <app-mynote-list></app-mynote-list>
        </div>
    `
})
export class MynotesComponent {
  pageNum:Number;
  fileName:String;

  constructor(private pdfService: PdfService) {
    this.fileName = this.pdfService.fileName;
    this.pageNum = 1;
    console.log("fileName", this.fileName);
    this.subscription = pdfService.pageNumAnnounced$.subscribe(
      pageNum => {
        console.log(pageNum);
        this.pageNum = pageNum;
    });
  }
}
