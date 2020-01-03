/*! Copyright (c) 2019, XAPPmedia */

export interface AppEndpointMap {
    [platform: string]: AppEndpoint;
}

export interface AppEndpoint {
    url: string;
}
