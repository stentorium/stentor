/*! Copyright (c) 2019, XAPPmedia */
export interface ImageSpecification {
    imageUrl: string;
    width: number;
    height: number;
}
export interface Image {
    contentDescription?: string;
    sources: ImageSpecification[];
}
