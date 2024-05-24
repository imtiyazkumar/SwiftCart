import { ErrorCode, HttException } from "./root";

export class BadRequestException extends HttException {
    constructor(message: string, errorCode: ErrorCode, errors: any,) {
        super(message, errorCode, 400, errors);
    }
}
