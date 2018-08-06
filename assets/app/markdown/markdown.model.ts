export class Markdown {
    content: string;
    file: string;
    username?: string;
    mdId?: string;
    userId?: string;

    constructor(content: string, file: string; mdId?: string,userId?: string) {
        this.content = content;
        this.file = file;
        this.mdId = mdId;
        this.userId = userId;
    }
}
