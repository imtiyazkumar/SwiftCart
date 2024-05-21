import { HttException } from "./root";

export class InternalException extends HttException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 500, errors);
    }
}
