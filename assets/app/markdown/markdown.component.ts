import { Component, Input } from '@angular/core';
import { markdownEditor } from './markdown';
import { Markdown } from './markdown.model'
import { MarkdownService } from "./markdown.service";
import { Router } from "@angular/router";


@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',

})
export class MarkdownComponent{

  markdown: Markdown=new Markdown("","");
  @Input() fileName: String;

  constructor(private markdownService: MarkdownService,private router:Router) {
  }

  onSubmit(form: NgForm) {
          console.log("add",this.fileName);
          const markdown = new Markdown(form.value.content,this.fileName);
          console.log("++++++ADD MD:",markdown);
          this.markdownService.addMarkdown(markdown)
              .subscribe(
                  data => console.log(data),
                  // error => console.error(error)
              );
  }

  onClear(form: NgForm) {
      this.markdown = null;
      form.resetForm();
      document.getElementById("preview").innerHTML="";
  }




  ngAfterViewInit(){


    function Editor(input, preview) {
      console.log(input)
      this.update = function () {
        preview.innerHTML = markdownEditor.toHTML(input.value);
      };
      input.editor = this;
      this.update();
    }
    var $ = function (id) { return document.getElementById(id); };
    const e = new Editor($("text-input"), $("preview"));


    console.log("fileName=",this.fileName)
    this.markdownService.getMarkdown(this.fileName)
      .subscribe(
          (markdown: Markdown) => {
              console.log("my-markdown",this.markdown);
              this.markdown = markdown;
              console.log("bbb",this.markdown.content);
              $("preview").innerHTML=markdownEditor.toHTML(markdown.content);
          }
          err=>{
            console.log("9999",err);
            setTimeout(() =>
            {
                this.router.navigateByUrl('/auth');
            },
            2000);
          }
      );
  }


}
