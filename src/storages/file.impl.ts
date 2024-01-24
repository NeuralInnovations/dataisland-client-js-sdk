import { Disposable } from '../disposable'
import { File, FileStatus } from "./files";


export class FileImpl extends File implements Disposable{
    dispose(): void {
        throw new Error('Method not implemented.');
    }
    get id(): string {
        throw new Error("Method not implemented.");
    }
    get name(): string {
        throw new Error("Method not implemented.");
    }
    url(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    get status(): FileStatus {
        throw new Error("Method not implemented.");
    }

}