/*! Copyright (c) 2022, XAPPmedia */
export interface DeliveryAddress {
    coordinates: {
        latitude: number;
        longitude: number;
    },
    postalAddress: {
        regionCode: string; // country
        postalCode: string;
        administrativeArea: string; // state
        locality: string; // city
        addressLines: string[];
        recipients: string[];
    },
    phoneNumber: string; // +1 703-555-NNNN
}
