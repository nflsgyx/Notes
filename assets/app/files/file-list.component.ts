import { Component, OnInit } from "@angular/core";

import { File } from "./file.model";
import { FileService } from "./file.service";
// import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-file-list',
    styleUrls:['./file-list.component.css'],
    templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {
    files: File[];
    depName: String;

    constructor(private fileService: FileService, private route:ActivatedRoute) {
      this.depName = this.route.queryParams._value.depName;
      console.log((this.route.queryParams._value.depName))
    }

    onChangeDep(depName) {
      if (depName=="ALL"){
        this.fileService.getFiles()
            .subscribe(
                (files: File[]) => {
                    this.files = files;
                }
            )
      } else {
        this.fileService.getFilesByDep(depName)
            .subscribe(
                (files: File[]) => {
                    this.files = files;
                }
            )
      }
    }

    ngOnInit() {
        if (this.depName == undefined){
          this.fileService.getFiles()
              .subscribe(
                  (files: File[]) => {
                      this.files = files;
                  }
              )
        }
    }




}
