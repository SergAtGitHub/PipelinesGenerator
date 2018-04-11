import { PipelineContext } from "solid-pipelines";
import { InteractionModeEnum } from './InteractionModeEnum'
import { GenerateFileModel } from "../GenerateFileFromTemplate/models/GenerateFileModel";
import Generator = require("yeoman-generator");
import { YeomanContext } from "../../foundation/PipelinesExtensions";

export class EnsureFileModelArguments extends YeomanContext {
    public static Create(
        yeomanGenerator: Generator,
        model?: GenerateFileModel,
        possibleName?: string,
        possibleOption?: string,
        possibleExtension?: string,
        interactionMode?: InteractionModeEnum
    ): EnsureFileModelArguments {
        return new EnsureFileModelArguments(
            yeomanGenerator,
            model,
            possibleName,
            possibleExtension,
            possibleOption,
            interactionMode
        );
    }

    public constructor(
        yeomanGenerator: Generator,
        model?: GenerateFileModel,
        possibleName?: string,
        public possibleOption?: string,
        possibleExtension?: string,
        interactionMode?: InteractionModeEnum
    ) {
        super(yeomanGenerator);
        this.interactionMode = interactionMode;
        this.possibleName = possibleName;
        this.possibleExtension = possibleExtension;
        this.fileModel = !model ? new GenerateFileModel() : model;
    }

    interactionMode: InteractionModeEnum;
    possibleName: string;
    possibleExtension: string;

    fileModel: GenerateFileModel;
}
