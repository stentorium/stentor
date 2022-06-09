/*! Copyright (c) 2019, XAPPmedia */
import { BaseRequest } from "./Request";
import { TransactionDeliveryAddressType } from "./Types";
import { DeliveryAddress } from "../DeliveryAddress";

export interface DeliveryAddressRequest extends BaseRequest {
    type: TransactionDeliveryAddressType
    sessionId: string;
    granted: boolean;
    deliveryAddress: DeliveryAddress;
}
