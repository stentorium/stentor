/*! Copyright (c) 2019, XAPPmedia */
/**
 * Quicker configurable uuid
 *
 * @export
 * @returns {string}
 */
export function uuid(): string {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-64xx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        /* tslint:disable:no-magic-numbers */
        /* tslint:disable:no-bitwise */
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        /* tslint:enable:no-magic-numbers */
        /* tslint:disable:no-bitwise */
    });

    return uuid;
}
