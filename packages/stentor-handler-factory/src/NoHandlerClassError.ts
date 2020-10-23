/*! Copyright (c) 2019, XAPPmedia */

export class NoHandlerClassError extends Error {
    constructor (message: string) {
        super(message)

        this.name = this.constructor.name
    }
}
