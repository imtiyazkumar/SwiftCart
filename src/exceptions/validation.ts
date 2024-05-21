import { HttException } from "./root";

export class UnprocessableEntity extends HttException {
    constructor(error: any, message: string, errorCode: number) {
        super(message, errorCode, 422, error);
    };
};
