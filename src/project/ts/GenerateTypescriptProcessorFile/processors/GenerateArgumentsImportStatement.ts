import S from "string";

import { GenerateProcessorFileProcessor } from "../../../../feature/GenerateProcessorFile/GenerateProcessorFileProcessor";
import { GenerateProcessorFileArguments } from "../../../../feature/GenerateProcessorFile/GenerateProcessorFileArguments";
import { GenerateTypescriptPathExecutor } from "../../GenerateTypescriptPath/GenerateTypescriptPathExecutor";

export class GenerateArgumentsImportStatement extends GenerateProcessorFileProcessor {
    public static readonly Instance = new GenerateArgumentsImportStatement();

    public async SafeExecute(args: GenerateProcessorFileArguments): Promise<void> {
        let result
            = await GenerateTypescriptPathExecutor.getPath(
                args.yeomanGenerator.destinationPath(args.fileModel.getSubdirectory()),
                args.yeomanGenerator.destinationPath(args.arguments.fileName)
            );

        if (result.result) {
            args.argumentsImportStatement = result.result;
        }
        else {
            args.AbortPipelineWithErrorMessage("Cannot obtain import statement for arguments path.");
        }

        args.AddMessageObjects(result.messages);
    }

    public SafeCondition(args: GenerateProcessorFileArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GenerateProcessorFileArguments): boolean {
        let safeCondition = args.arguments && !S(args.arguments.fileName).isEmpty();
        return safeCondition;
    }
}