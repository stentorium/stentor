/*! Copyright (c) 2022, XAPPmedia */
import { ErrorEvent } from "../Events";

export interface ErrorService {
    error(error: Error): ErrorEvent;
}
