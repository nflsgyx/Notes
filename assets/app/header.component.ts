import { Component,Input,EventEmitter,Output} from "@angular/core";

@Component({
    selector: 'app-header',
    styleUrls: ['./header.component.css'],
    templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() queryFile:string;
  showInput:boolean=true;
  useMarkdown:boolean=false;
  allowUseMarkdown:boolean=false;

  @Output() changeShowInputEvent = new EventEmitter();
  @Output() changeUseMarkdownEvent = new EventEmitter();


  onChangeShowInput(){
    this.showInput=!this.showInput;
    if (this.useMarkdown && this.showInput){
        this.onChangeUseMarkdown();
    }
    this.changeShowInputEvent.emit(this.showInput);
  }

  onChangeUseMarkdown(){
    this.useMarkdown=!this.useMarkdown;
    if (this.useMarkdown && this.showInput){
        this.onChangeShowInput();
    }
    if (!this.useMarkdown && !this.showInput){
        this.onChangeShowInput();
    }
    this.changeUseMarkdownEvent.emit(this.useMarkdown);
  }

}
