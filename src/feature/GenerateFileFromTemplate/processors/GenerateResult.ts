import { GenerateFileFromTemplateProcessor } from "../GenerateFileFromTemplateProcessor";
import { GenerateFileFromTemplateArguments } from "../GenerateFileFromTemplateArguments";

import fs = require("fs");
import S = require("string");
import { CreatedFileResult } from "../models/CreatedFileResult";

export class GenerateResult extends GenerateFileFromTemplateProcessor {
    public static readonly Instance = new GenerateResult();

    public async SafeExecute(args: GenerateFileFromTemplateArguments): Promise<void> {
        if (!fs.existsSync(args.destination)) {
            args.AbortPipelineWithErrorMessage("The file '" + args.destination + "' was not created, please review passed data or contact developers.");
            return;
        }

        let res = new CreatedFileResult();
        res.className = args.fileModel.className;
        res.fileName = args.fileModel.fileName;
    }

    public SafeCondition(args: GenerateFileFromTemplateArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GenerateFileFromTemplateArguments): boolean {
        let safeCondition = true;
        return safeCondition;
    }
}