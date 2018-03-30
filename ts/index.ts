import Generator = require("yeoman-generator");
import { Question, Inquirer } from "inquirer";

class PipelinesGenerator extends Generator {
    answersListener: Promise<Generator.Answers>;

    constructor(args: string | string[], options: {}) {
        super(args, options);

        let subfolderArgumentConfig: Generator.OptionConfig = {
            description: "Specififes, whether to create a subfolder for the current item.",
            default: false
        };
        this.option("subfolder", subfolderArgumentConfig);
    }

    initializing() {
    }

    async prompting() {
        var pipelineNameQuestion: Question = {
            type: 'input',
            name: 'pipelineName',
            message: 'Enter a pipeline name: ',
            default: 'HelloWorld'
        };

        var processorsNameQuestion: Question = {
            type: 'input',
            name: 'processorNames',
            message: 'Enter processors names (separate them via whitespace): ',
            default: 'HelloWorld'
        };

        var questions: Generator.Question[] = [
            pipelineNameQuestion,
            processorsNameQuestion
        ];

        this.answersListener = this.prompt(questions);
    }

    configuring() {

    }

    async default() {
        var answers: Generator.Answers = await this.answersListener;
        var pipelineName: string = answers["pipelineName"];
        var processorNames: string = answers["processorNames"];
        var processorNameStrings: string[] = processorNames.split(' ');

        this._createPipelineInfrastructure(pipelineName, processorNameStrings, this.options["subfolder"]);
    }

    _createPipelineInfrastructure(pipelineName: string, processors: string[], createSubfolder: boolean = true) {
        let pipelineDestination = createSubfolder ? `./${pipelineName}/` : './';
        let processorDestination = pipelineDestination + 'processors/';
        
        this._createPipeline(pipelineName, processors, pipelineDestination);
        this._createAbstractProcessor(pipelineDestination, pipelineName);
        this._createArguments(pipelineName, pipelineDestination);
        this._createExports(processors, processorDestination);
        this._createExecutor(pipelineName, pipelineDestination);
        this._createPipelinesExports(pipelineName, pipelineDestination);

        for (const processorName of processors) {
            this._createProcessor(processorDestination, processorName, pipelineName);
        }
    }

    _createExecutor(pipelineName: string, destination: string) {
        const fileName = pipelineName + 'Executor.ts';
        this.fs.copyTpl(
            this.templatePath('_pipelineExecutor.ts.ejs'),
            this.destinationPath(destination + fileName),
            {
                'pipelineName': pipelineName
            },
            {});
    }

    _createPipelinesExports(pipelineName: string, destination: string) {
        let files = [
            `${pipelineName}Executor`,
            `${pipelineName}Arguments`
        ];

        this._createExports(files, destination);
    }

    _createExports(exportFiles: string[], destination: string) {
        const fileName = 'index.ts';
        this.fs.copyTpl(
            this.templatePath('_exports.ts.ejs'),
            this.destinationPath(destination + fileName),
            {
                'exportFileNames': exportFiles
            },
            {});
    }

    _createArguments(pipelineName: string, destination: string) {
        let fileName = pipelineName.endsWith('.ts') ? pipelineName : pipelineName + '.ts';
        fileName =
            fileName.endsWith('Arguments.ts')
                ? fileName
                : fileName.substring(0, fileName.length - 3) + 'Arguments.ts';

        this.fs.copyTpl(
            this.templatePath('_arguments.ts.ejs'),
            this.destinationPath(destination + fileName),
            {
                'pipelineName': pipelineName
            },
            {});
    }

    _createPipeline(name: string, processors: string[], destination: string) {
        let fileName = name.endsWith('.ts') ? name : name + '.ts';
        fileName =
            fileName.endsWith('Pipeline.ts')
                ? fileName
                : fileName.substring(0, fileName.length - 3) + 'Pipeline.ts';

        this.fs.copyTpl(
            this.templatePath('_pipeline.ts.ejs'),
            this.destinationPath(destination + fileName),
            {
                'pipelineName': name,
                'processors': processors
            },
            {});
    }

    _createAbstractProcessor(destination: string, pipelineName: string) {
        let name = pipelineName + 'Processor';

        this.fs.copyTpl(
            this.templatePath('_abstractProcessor.ts.ejs'),
            this.destinationPath(destination + name + '.ts'),
            {
                'pipelineName': pipelineName
            },
            {});
    }

    _createProcessor(destination: string, name: string, pipelineName: string) {

        this.fs.copyTpl(
            this.templatePath('_predefinedProcessor.ts.ejs'),
            this.destinationPath(destination + name + '.ts'),
            {
                'pipelineName': pipelineName,
                'processorName': name
            },
            {});
    }

    writing() {
        this.log("APP");
    }
}

export = PipelinesGenerator
