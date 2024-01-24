import { Context } from "../context";
import { File, Files } from "./files";
import { WorkspaceImpl } from "./workspace.impl";



export class FilesImpl extends Files{
    constructor(
        private readonly workspace: WorkspaceImpl, 
        private readonly context: Context
        ) {
        super()
      }

    get total(): number {
        throw new Error("Method not implemented.");
    }
    upload(path: string, name: string): Promise<File> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    query(path: string, page: number, limit: number): Promise<File[]> {
        throw new Error("Method not implemented.");
    }

    
    
}