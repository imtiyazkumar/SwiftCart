import { ErrorCode, HttException } from "./root";

export class UnAuthorizedException extends HttException {
    constructor(message: string, errorCode: ErrorCode, errors?: any,) {
        super(message, errorCode, 401, errors);
    }
}
