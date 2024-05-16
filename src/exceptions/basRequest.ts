import { ErrorCode, HttException } from "./root";

export class BadRequestException extends HttException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
    }
}
