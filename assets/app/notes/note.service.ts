import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Note } from "./note.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class NoteService {
    private notes: Note[] = [];
    noteIsEdit = new EventEmitter<Note>();

    constructor(private http: Http, private errorService: ErrorService) {
    }

    addNote(note: Note) {
        const body = JSON.stringify(note);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/note/' +note.file+'/'+note.page+token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const note = new Note(
                    result.obj.content,
                    result.obj.isShared,
                    result.obj.file,
                    result.obj.page
                    result.obj._id,
                    result.user.firstName,
                    result.user._id,
                    result.obj.time
                    );
                this.notes.splice(0, 0, note);
                //this.notes.push(note);
                console.log(result.obj);
                return note;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getNotes(fileName:string,pageNum:number) {
        return this.http.get('http://localhost:3000/note/'+fileName+'/'+pageNum)
            .map((response: Response) => {
                const notes = response.json().obj;
                let transformedNotes: Note[] = [];
                for (let note of notes) {
                    transformedNotes.push(new Note(
                        note.content,
                        note.isShared,
                        note.file,
                        note.page,
                        note._id,
                        note.user.firstName,
                        note.user._id,
                        note.time
                      )
                    );
                }
                this.notes = transformedNotes.reverse();
                return this.notes;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }


    getMyNotes(fileName:string,pageNum:number) {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/note/mynotes/'+fileName+'/'+pageNum+token,{headers: headers})
          .map((response: Response) => {
            const notes = response.json().obj;
            console.log(notes);
            let transformedNotes: Note[] = [];
            for (let note of notes) {
                transformedNotes.push(new Note(
                    note.content,
                    note.isShared,
                    note.file,
                    note.page,
                    note._id,
                    "",
                    note.user._id,
                    note.time
                    )
                );
            }
            this.notes = transformedNotes.reverse();
            console.log(this.notes);
            return this.notes;
          })
          .catch((error: Response) => {
              this.errorService.handleError(error.json());
              return Observable.throw(error.json());
          });
    }

    editNote(note: Note) {
        this.noteIsEdit.emit(note);
    }

    updateNote(note: Note) {
        const body = JSON.stringify(note);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/note/' + note.noteId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteNote(note: Note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/note/' + note.noteId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}
