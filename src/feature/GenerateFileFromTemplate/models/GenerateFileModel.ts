import path = require("path");
import S from "string";

export class GenerateFileModel {
    fileName: string = "";
    templateName: string = "";
    subdirectories: string[] = [];
    subdirectoryNameTuner: (subdirectory: string) => string;
    extension: string = "";
    
    ensureSuffixInFileName: boolean = true;
    ensureSuffixInClassName: boolean = true;
    suffix: string = "";

    options: {} = {};

    getSubdirectory(): string {
        return path.join(...this.subdirectories);
    }

    getFinalPath(): string {
        return path.join(this.getSubdirectory(), this.getFinalName());
    }

    getFinalName(): string {
        return S(this.fileName).ensureRight(this.extension).s;
    }
}