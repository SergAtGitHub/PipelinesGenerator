import { GetNamespaceFromFolderNamesProcessor } from "../GetNamespaceFromFolderNamesProcessor";
import { GetNamespaceFromFolderNamesArguments } from "../GetNamespaceFromFolderNamesArguments";

import path = require("path");
import S from "string";
import { FindFileExecutor } from "../../../../foundation/FindFile";

export class TryFindProjectFile extends GetNamespaceFromFolderNamesProcessor {
    public static readonly Instance = new TryFindProjectFile();

    public async SafeExecute(args: GetNamespaceFromFolderNamesArguments): Promise<void> {
        let result = await FindFileExecutor.findFiles(
            args.destinationPath,
            "packages.config"
        );

        if (result.length > 0) {
            args.projectDirectory = result[0];
        }
    }

    public SafeCondition(args: GetNamespaceFromFolderNamesArguments): boolean {
        return super.SafeCondition(args) && this.CustomCondition(args);
    }

    public CustomCondition(args: GetNamespaceFromFolderNamesArguments): boolean {
        let safeCondition = S(args.projectDirectory).isEmpty() && args.shouldFindProjectDirectory;
        return safeCondition;
    }
}
