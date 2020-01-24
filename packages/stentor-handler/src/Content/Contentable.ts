/*! Copyright (c) 2019, XAPPmedia */
/**
 * Interface that can be applied to an object if it has content associated with it.
 *
 * @export
 * @interface Contentable
 */
export interface Contentable {
    /**
     * The key of the content
     *
     * @type {string}
     * @memberof Contentable
     */
    content: string;
}

/*
 * Helpful alias to make any object implement Contentable
 */
export type Contented<T> = T & Contentable;
