import { Component,OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileService } from './file.service';
import { File } from './file.model';

// import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
    selector: 'app-uploader',
    templateUrl: './upload.component.html',
    styleUrls:['./upload.component.css']
})
export class UploadComponent implements OnInit{
    public uploader:FileUploader = new FileUploader({url:'/upload',allowedFileType:['pdf'],removeAfterUpload:false});
    moduleStr:string[]=[];
    codeStr:string[]=[];
    moduleCode:string[]=[];
    weekNum:string[]=[];
    isUploaded:boolean[]=[];
    index:number=0;
    moduleOptions =
            [
                "Writing code",
                "Testing code",
                "Fixing bugs",
                "Dancing"
            ];

    constructor(private fileService: FileService) {
      console.log(this.moduleOptions);
    }

    onChangeModuleCode(i){
      this.valid=true;
      for (var k=0;k<this.uploader.queue.length;k++){
        if (this.moduleStr[k]==""||this.codeStr[k]==""||this.weekNum[k]=="") {
          this.valid=false;
        }
      }
    }

    async onUpload(i){
          console.log('****');

        this.index=i;
        if (!this.isUploaded[i]){
          this.isUploaded[i]=true;
          await console.log(this.uploader.queue[i].upload());
                  console.log('++++');
          const self = this;
          return new Promise((resolve)=>{
            setTimeout(()=>resolve(
              (() =>
              {
                self.moduleCode[i]=self.moduleStr[i].toUpperCase()+self.codeStr[i];
                console.log('2', self.moduleCode[i]);
                const file = new File(self.moduleCode[i],self.weekNum[i],"This is retained for the general introduction of the lecture slides.");
                console.log('file', file);
                console.log('3', self);
                self.fileService.addFile(file)
                    .subscribe(
                        data => console.log('data:', data)
                    );
              })()
            ),1500);
          });
        }
    }

    async onUploadAll(){
      for (let k=0;k<this.uploader.queue.length;k++){
        await this.onUpload(k);
        console.log('for');
      }
      console.log('√');
      this.onClearAll();
    }

    onClearAll(){
      this.uploader.clearQueue();
      for (var i = 0; i < 100; i++){
       this.moduleCode[i]="";
       this.moduleStr[i]="";
       this.codeStr[i]="";
       this.weekNum[i]="";
       this.isUploaded[i]=false;
      }
    }

    ngOnInit(){
      for (var i = 0; i < 100; i++){
       this.moduleCode.push("");
       this.codeStr.push("");
       this.moduleStr.push("");
       this.weekNum.push("");
       this.isUploaded.push(false);
      }
      this.uploader.onAfterAddingAll = (fileItems)=>{
        this.valid=false;
      }
    }


}
