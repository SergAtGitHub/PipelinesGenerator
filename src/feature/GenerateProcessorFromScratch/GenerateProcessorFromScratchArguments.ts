import { PipelineContext } from "solid-pipelines";
import { GenerateFileModel } from "../GenerateFileFromTemplate/models/GenerateFileModel";
import { CreatedFileResult } from "../GenerateFileFromTemplate/models/CreatedFileResult";
import { GenerateProcessorFileExecutor } from "../GenerateProcessorFile";
import { YeomanQueryContext } from "../../foundation/PipelinesExtensions";

import Generator = require("yeoman-generator");

export class GenerateProcessorFromScratchArguments extends YeomanQueryContext<CreatedFileResult> {
    constructor(
        yeomanGenerator: Generator,
        public processorGenerator: GenerateProcessorFileExecutor,
        public model: GenerateFileModel,
        public argumentsModel?: CreatedFileResult,
        public processorModel?: CreatedFileResult,

    ) {
        super(yeomanGenerator);
    }

    guesses: string[] = [];
}
