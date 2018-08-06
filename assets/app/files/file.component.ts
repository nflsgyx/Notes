import { Component, Input } from "@angular/core";

import { File } from "./file.model";
import { FileService } from "./file.service";

@Component({
    selector: 'app-file',
    styleUrls:['../reset.css','./file.component.css'],
    templateUrl: './file.component.html'
})
export class FileComponent {
    @Input('file') file;

    constructor(private fileService: FileService) {
      // console.log('file', this.file)
    }

    console.log(file);
}
