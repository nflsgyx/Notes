import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Markdown } from "./markdown.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MarkdownService {
    private markdown: Markdown;

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addMarkdown(markdown: Markdown) {
        const body = JSON.stringify(markdown);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/markdown/'+markdown.file+token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const newMarkdown = new Markdown(
                    result.obj.content,
                    result.obj.file,
                    result.obj._id,
                    result.user
                    );
                this.markdown = newMarkdown;
                console.log(result.obj);
                return newMarkdown;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getMarkdown(fileName:string) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/markdown/'+fileName+token,{headers: headers})
          .map((response: Response) => {
            const result = response.json();
            console.log(result);
            const newMarkdown = new Markdown(
                result.obj.content,
                result.obj.file,
                result.obj._id,
                result.user
                );
            this.markdown = newMarkdown;
            console.log("newmarkdown",newMarkdown);
            return newMarkdown;
          })
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          });
    }

}
