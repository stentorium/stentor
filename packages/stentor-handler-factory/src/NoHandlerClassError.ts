/*! Copyright (c) 2019, XAPPmedia */

export class NoHandlerClassError extends Error {
    public constructor(message: string) {
        super(message)

        this.name = this.constructor.name
    }
}
