export class File {
    moduleCode: string;
    weekNum: string;
    intro: string;
    fileId?: string;

    constructor(moduleCode: string, weekNum: string, intro:string, fileId?: string) {
      this.moduleCode = moduleCode;
      this.weekNum = weekNum;
      this.intro = intro;
      this.fileId = fileId;
    }
}
