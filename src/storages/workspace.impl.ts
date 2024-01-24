import { Files } from "./files";
import { Workspace } from "./workspace";
import { Disposable } from '../disposable'

export class WorkspaceImpl extends Workspace implements Disposable{
    dispose(): void {
        throw new Error("Method not implemented.");
    }
    get id(): string {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        throw new Error("Method not implemented.");
    }
    get description(): string {
        throw new Error("Method not implemented.");
    }
    get files(): Files {
        throw new Error("Method not implemented.");
    }
    change(name: string, description: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}