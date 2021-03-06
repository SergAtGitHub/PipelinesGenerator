import { GenerateProcessorFromScratchProcessor } from "../GenerateProcessorFromScratchProcessor";
import { GenerateProcessorFromScratchArguments } from "../GenerateProcessorFromScratchArguments";
import { Question } from "yeoman-generator";
import { InputTypeEnum } from "../../../foundation/YeomanQuestions";
import { GenerateProcessorFromScratchMessages } from "../GenerateProcessorFromScratchMessages";
import { GenerateProcessorFileOptions } from "../../GenerateProcessorFile/GenerateProcessorFileOptions";
import S from "string";

export class AskForProcessorName extends GenerateProcessorFromScratchProcessor {
    public static readonly Instance = new AskForProcessorName();

    public async SafeExecute(args: GenerateProcessorFromScratchArguments): Promise<void> {
        const optionName = GenerateProcessorFileOptions.PROCESSOR_NAME;
        const regex = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

        let question: Question = {
            type: InputTypeEnum.Input,
            name: optionName,
            message: GenerateProcessorFromScratchMessages.ProvideProcessorName,
            validate: (input) => regex.test(input),
            default: args.guesses && args.guesses.length > 0 ? args.guesses[0] : "Processor"
        };

        let answers = await args.yeomanGenerator.prompt(question);
        let answer = answers[optionName];

        args.model.options["className"] = answer;
    }

    public SafeCondition(args: GenerateProcessorFromScratchArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GenerateProcessorFromScratchArguments): boolean {
        let safeCondition = S(args.model.options["className"]).isEmpty() && S(args.model.fileName).isEmpty();
        return safeCondition;
    }
}
