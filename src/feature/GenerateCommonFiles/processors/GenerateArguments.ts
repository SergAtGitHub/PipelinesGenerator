import { GenerateCommonPipelineFilesProcessor } from "../GenerateCommonPipelineFilesProcessor";
import { GenerateCommonPipelineFilesArguments } from "../GenerateCommonPipelineFilesArguments";
import S from "string";
import { GenerateFileFromTemplateArguments, GenerateFileFromTemplateExecutor } from "../../GenerateFileFromTemplate";
import { EnsureFileModelExecutor, EnsureFileModelArguments } from "../../EnsureFileModel";
import { GenerateArgumentsFileArguments, GenerateArgumentsFileExecutor } from "../../GenerateArgumentsFile";

export class GenerateArguments extends GenerateCommonPipelineFilesProcessor {
    public static readonly Instance = new GenerateArguments();

    public async SafeExecute(args: GenerateCommonPipelineFilesArguments): Promise<void> {
        let model = args.modelsProvider.getArgumentsModel();
        if (!model) {
            args.AbortPipelineWithErrorMessage("You have to specify some data for arguments generation.");
            return;
        }

        model.subdirectories = [
            ...args.commonSubfolders, 
            ...model.subdirectories
        ];
        let argumentsGeneration = GenerateArgumentsFileArguments.Create(
            model, 
            args.yeomanGenerator,
            args.generatorsProvider.getFileFromTemplateGenerator(),
            args.pipelineNameSpecifiedByUser
        );

        let executionResult 
            = await args.generatorsProvider.getArgumentsGenerator().execute(argumentsGeneration);

        args.generatedArguments = executionResult.result;
        args.AddMessageObjects(argumentsGeneration.GetAllMessages());
    }

    public SafeCondition(args: GenerateCommonPipelineFilesArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GenerateCommonPipelineFilesArguments): boolean {
        let safeCondition = true;
        return safeCondition;
    }
}
