/*! Copyright (c) 2019, XAPPmedia */

/**
 * Generate a quick, but not perfect, UUID
 * 
 * @remarks
 * This method optimizes quickness as opposed to absolute collisionless UUIDs
 *
 * @public
 * @returns UUID string 
 */
export function uuid(): string {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-64xx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });

    return uuid;
}
