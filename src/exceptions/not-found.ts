import { ErrorCode, HttException } from "./root";

export class NotFoundException extends HttException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null);
    }
}
