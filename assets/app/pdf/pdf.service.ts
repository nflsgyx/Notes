import { Injectable, OnInit} from "@angular/core";
import { Subject }    from 'rxjs';
@Injectable()
export class PdfService{
  fileName: String;
  page:Number;
  useMarkdown:Boolean=false;
  private pageNum = new Subject<Number>();
  pageNumAnnounced$ = this.pageNum.asObservable();
  announcePageNum(x:Number){
    this.page = x;
    this.pageNum.next(x);
  }

}
