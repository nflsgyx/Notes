import { Component } from '@angular/core';

import { NoteService } from "./notes/note.service";
import { ActivatedRoute } from "@angular/router";
import { PdfService} from "./pdf/pdf.service"
import { MarkdownService } from "./markdown/markdown.service"

@Component({
    selector: 'app-notetaking',
    templateUrl: './notetaking.component.html',
    styleUrls:['./reset.css'],
    providers: [NoteService,PdfService,MarkdownService]
})

export class NoteTakingComponent implements OnInit{
  pdfSrc:string;
  queryFile:string;
  pageNum:number;
  width:string[]=["25%","40%","50%","60%","90%"];
  zoom:number[]=[0.998,0.99999,1,1.00142,1.0014200000000001];
  widthStr:string;
  positionStr:string="relative";
  topStr:string="0px";
  noteWidthStr:string="80%";
  noteLeftStr:string="0";
  noteTopStr:string="0";
  notePositionStr="relative";
  noteZindexStr = "0";
  noteHeightStr = "700px";
  showInput:boolean;
  useMarkdown:boolean;
  k:number;

  constructor(private route:ActivatedRoute, private pdfService:PdfService){
    this.queryFile = this.route.queryParams._value.file;
    console.log("****",this.route.snapshot._routerState.url.indexOf("mynotes"));
    this.pdfSrc = "/files/"+this.queryFile;
    this.pdfService.fileName = this.queryFile;
    this.pdfService.announcePageNum(1);
    this.widthStr="50%";
    this.k = 2;
    this.zoomNum=1;
    this.showInput=true;
    this.useMarkdown=false;
  }

  refreshNotes(event){
        this.pageNum = event;
        this.pdfService.announcePageNum(this.pageNum);
  }

  zoomIn(){
    if (this.k<4){
    this.k=this.k+1;
    this.widthStr = this.width[this.k];
    this.zoomNum=this.zoom[this.k];
    }
  }

  zoomOut(){
    if (this.k>0){
    this.k=this.k-1;
    this.widthStr = this.width[this.k];
    this.zoomNum=this.zoom[this.k];
    }
  }

  updateShowInput(event){
    this.showInput=event;
  }

  updateUseMarkdown(event){
    this.useMarkdown=event;
    this.pdfService.useMarkdown=this.useMarkdown;
    if (this.useMarkdown){
      this.zoomOut();
      this.zoomOut();
      this.positionStr='fixed';
      this.topStr="15px";
      this.notePositionStr="absolute";
      this.noteWidthStr='40%';
      this.noteLeftStr="-5%";
      this.noteTopStr="50%";
      this.noteZindexStr = "0";
      this.noteHeightStr = "400px";
    } else {
      this.zoomIn();
      this.zoomIn();
      this.positionStr='relative';
      this.topStr="0px";
      this.notePositionStr="relative";
      this.noteWidthStr='100%';
      this.noteLeftStr="0";
      this.noteTopStr="0";
      this.noteZindexStr = "0";
      this.noteHeightStr = "700px";
    }
  }

  ngOnInit{
    this.pageHeight = document.body.clientHeight;
    console.log("height",this.pageHeight);
  }

}