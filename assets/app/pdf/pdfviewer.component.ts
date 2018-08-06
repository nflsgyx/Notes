import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-pdfviewer',
  
  styleUrls: ['../reset.css','./pdfviewer.css'],
  templateUrl:'./pdfviewer.component.html',
})
export class PdfComponent implements OnInit{

  @Output() changePageEvent = new EventEmitter();
  @Input() pdfSrc: String;
  pageNum = 1;
  @Input() zoomNum;
  totalPage = 1;
  top = '50%';

   onFileSelected() {
     let $img: any = document.querySelector('#file');

     if (typeof (FileReader) !== 'undefined') {
       let reader = new FileReader();

       reader.onload = (e: any) => {
         this.pdfSrc = e.target.result;
       };
       reader.readAsArrayBuffer($img.files[0]);
       this.pageNum = 1;
     }
   }

   onChangePageNum(){
     if (this.pageNum>this.totalPage){
       this.pageNum = this.totalPage
     }
     this.changePageEvent.emit(this.pageNum);
   }

  nextPage() {
     if (this.pageNum<this.totalPage){
      this.pageNum++;
    }
    this.onChangePageNum();
  }

   previousPage() {
     if (this.pageNum>1) {
       this.pageNum--;
     }
    this.onChangePageNum();
   }


   zoomIn(){
      this.zoomNum+=0.1;
   }

   zoomOut(){
      this.zoomNum-=0.1;
   }

  callBackFn(pdf: PDFDocumentProxy) {
   console.log("totalPage=",pdf.pdfInfo.numPages);
   this.totalPage = pdf.pdfInfo.numPages;
  }

  pageRendered(e: CustomEvent) {
    console.log('1111111', e);
  }

  showCoord(){
    console.log(this.zoomNum);
  }

}
