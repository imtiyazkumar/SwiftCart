export class HttException extends Error {
    message: string;
    errCode: any;
    statusCode: number;
    errors: ErrorCode

    constructor(message: string, errCode: ErrorCode, statusCode: number, errors: any) {
        super(message)
        this.message = message
        this.errCode = errCode
        this.statusCode = statusCode
        this.errors = errors
    }
}


export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003
}
