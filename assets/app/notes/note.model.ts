export class Note {
    content: string;
    username?: string;
    noteId?: string;
    userId?: string;
    time?: string;
    isShared: boolean;
    file: string;
    page: number;

    constructor(content: string,isShared:boolean, file:string, page:number, noteId?: string, username?: string,userId?: string, time?: string) {
        this.content = content;
        this.username = username;
        this.noteId = noteId;
        this.userId = userId;
        this.time = time;
        this.isShared = isShared;
        this.file = file;
        this.page = page;
    }
}
