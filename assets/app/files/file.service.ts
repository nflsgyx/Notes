import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { File } from './file.model';
import { ErrorService } from "../errors/error.service";

@Injectable()
export class FileService {
    private files: File[] = [];
    fileIntroIsEdit = new EventEmitter<File>();
    currentDep: String;

    constructor(private http: Http) {
      this.currentDep = "ALL";
    }

    addFile(file: File) {
        const body = JSON.stringify(file);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/fileservice', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json().obj;
                const file = new File(
                    result.moduleCode,
                    result.weekNum,
                    result.intro,
                    result._id
                );
                if (this.currentDep=="ALL" || this.currentDep==file.moduleCode.substr(0,3)){
                    this.files.splice(0, 0, file);
                }
                return file;
            })
            .catch((error: Response) => {
              console.log(error);
            });
    }

    getFiles() {
        this.currentDep = "ALL";
        return this.http.get('http://localhost:3000/fileservice')
            .map((response: Response) => {
                const files = response.json().obj;
                let transformedFiles: File[] = [];
                for (let file of files) {
                    transformedFiles.push(new File(
                        file.moduleCode,
                        file.weekNum,
                        file.intro,
                        file._id
                    ));
                }
                this.files = transformedFiles.reverse();
                return this.files;
            })
            .catch((error: Response) => {
              console.log(error);
            });
    }

    getFilesByDep(depName:String) {
        return this.http.get('http://localhost:3000/fileservice/'+depName)
            .map((response: Response) => {
                const files = response.json().obj;
                let transformedFiles: File[] = [];
                for (let file of files) {
                    transformedFiles.push(new File(
                        file.moduleCode,
                        file.weekNum,
                        file.intro,
                        file._id
                    ));
                }
                this.files = transformedFiles.reverse();
                this.currentDep = depName;
                return this.files;
            })
            .catch((error: Response) => {
              console.log(error);
            });
    }

    editIntro(file: File) {
        this.fileIntroIsEdit.emit(file);
    }

    updateIntro(file: File) {
        const body = JSON.stringify(file);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/fileservice/' + file.fileId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }

    deleteFile(file: File) {
        this.files.splice(this.files.indexOf(file), 1);
        return this.http.delete('http://localhost:3000/fileservice' + file.fileId)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                return Observable.throw(error.json());
            });
    }
}
