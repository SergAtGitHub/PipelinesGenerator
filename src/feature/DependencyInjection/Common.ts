import { Container } from "inversify";
import { injectProgramFlow } from "../ProgramFlow/DependencyInjection";
import { injectProgramFlowQuestion } from "../ChooseProgramFlow/DependencyInjection";
import { injectSolidPipelines } from "../../foundation/PipelinesExtensions/DependencyInjection";
import { injectProcessorFromScratchGeneration } from "../GenerateProcessorFromScratch/DependencyInjection";
import { injectFileDependencyProvider } from "../../foundation/ResolveFileDependency/DependencyInjection";

function injectCommon(container: Container) {
    injectSolidPipelines(container);
    injectProgramFlow(container);
    injectProgramFlowQuestion(container);
    injectProcessorFromScratchGeneration(container);
    injectFileDependencyProvider(container);
}

export { injectCommon }
