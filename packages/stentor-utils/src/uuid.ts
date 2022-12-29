/*! Copyright (c) 2019, XAPPmedia */

/**
 * Generate a quick, but not perfect, UUID
 * 
 * @remarks
 * This method optimizes quickness as opposed to absolute collisionless UUIDs
 * This is also a week UUID since it relies on Math.random()
 *
 * @public
 * @returns UUID string 
 */
export function uuid(): string {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-64xx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        // When we drop older version of node, less than 15, we can use cyrpto.getRandomValues
        // instead of Math.random()
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });

    return uuid;
}
