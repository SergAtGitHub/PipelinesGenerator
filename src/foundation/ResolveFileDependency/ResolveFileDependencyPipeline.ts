import { IPipeline, IProcessor } from 'solid-pipelines'
import * as Processors from './processors'

export class ResolveFileDependencyPipeline implements IPipeline {
    public static readonly Instance = new ResolveFileDependencyPipeline();

    GetProcessors(): IProcessor[] {
        return [
            Processors.ValidateArguments.Instance,
            Processors.TryToGuessPath.Instance,
            Processors.FilterGuesses.Instance,
            Processors.AskWhetherPathIsCorrect.Instance,
            Processors.AskToChoosePathFromSeveralGuesses.Instance,
            Processors.AskPathIfGuessIsNotCorrect.Instance,
            Processors.AskIfFileShouldBeCreatedIfItDoesntExist.Instance,
        
        ];
    }
}