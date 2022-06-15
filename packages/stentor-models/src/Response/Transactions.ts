/*! Copyright (c) 2022, XAPPmedia */

/**
    Here we go again. We are abstracting the Stentor input following a platform. In this case Google.
    This is a more common sense (more user-friendly), de-googlified version of the Google inputs.
    This transaction API could change in the future as we gain more experience.
*/

export type PaymentType =
    "PAYMENT_TYPE_UNSPECIFIED"
    | "PAYMENT_CARD"
    | "BANK"
    | "LOYALTY_PROGRAM"
    | "CASH"
    | "GIFT_CARD"
    | "WALLET";

export type PaymentMethodStatusType =
    "STATUS_UNSPECIFIED"
    | "STATUS_OK" // Payment method is ok to use.
    | "STATUS_REQUIRE_FIX" // Payment method requires fix before using.
    | "STATUS_INAPPLICABLE" ;

export type PurchaseStatus =
    "PURCHASE_STATUS_UNSPECIFIED"  //	Status unspecified.
    | "READY_FOR_PICKUP" //	Ready for pickup.
    | "SHIPPED" //	Shipped.
    | "DELIVERED" // Delivered.
    | "OUT_OF_STOCK" //	Out of stock.
    | "IN_PREPARATION" //	"IN_PREPARATION" could have different meaning in different context (food)
    | "CREATED" //	Order is created.
    | "CONFIRMED" //	The merchant confirmed the order.
    | "REJECTED" //	Merchant rejected the order or line item.
    | "RETURNED" //	The Item was returned by user.
    | "CANCELLED" //	The order or line item was cancelled by user.
    | "CHANGE_REQUESTED" //;

export type PurchaseType =
    | "PURCHASE_TYPE_UNSPECIFIED" // Unknown value.
    | "RETAIL" // It includes purchases like physical goods.
    | "FOOD" // It includes food order purchase.
    | "GROCERY" // Grocery purchase.
    | "MOBILE_RECHARGE";

export type FulfillmentType =
    "TYPE_UNSPECIFIED"
    | "DELIVERY"
    | "PICKUP";

export type PickupType =
    "UNSPECIFIED"
    | "INSTORE"
    | "CURBSIDE";

export type FollowUpActionType =
    "VIEW_DETAILS" // "http://example.com"
    | "CALL" // "tel:+16501112222"
    | "EMAIL"; //  "mailto:person@example.com";

export type PriceType =
    "UNIT"
    | "TOTAL"
    | "SUBTOTAL"
    | "DELIVERY"
    | "TAX";

export type PriceState =
    "ESTIMATE"
    | "ACTUAL";

export type ProvenanceType =
    "PAYMENT_METHOD_PROVENANCE_MERCHANT"
    | "PAYMENT_METHOD_PROVENANCE_UNSPECIFIED"
    | "PAYMENT_METHOD_PROVENANCE_GOOGLE";

export type PurchaseLocationType =
    "ONLINE_PURCHASE" | "UNSPECIFIED_LOCATION" | "INSTORE_PURCHASE";

export interface PaymentMethodDisplayInfo {
    paymentType: PaymentType;
    paymentMethodDisplayName: string;
    paymentMethodVoiceName: string
}

export interface PaymentMethodStatus {
    status: PaymentMethodStatusType;
    statusMessage: string;
}

export interface MerchantPaymentMethod {
    paymentMethodGroup: string;
    paymentMethodId: string;
    paymentMethodDisplayInfo: PaymentMethodDisplayInfo;
    paymentMethodStatus: PaymentMethodStatus;
}

export interface PaymentParameters {
    googlePaymentOption?: never; // for future user

    merchantPaymentOption: {
        merchantPaymentMethod: MerchantPaymentMethod[];
        defaultMerchantPaymentMethodId: string;
        managePaymentMethodUrl: string;
    }
}

export interface BuyerInfo {
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    phoneNumbers: string[];
}

export interface SellerInfo {
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
    phoneNumbers: string[];
}

export interface MerchantInfo {
    id: string;
    name: string;
    image?: TransactionImage;
    phoneNumbers?: string[];
    address?: string;
}

export interface FollowUpAction {
    type: FollowUpActionType;
    title: string;
    openUrlAction: {
        url: string;
    }
}

export interface LineItem {
    id: string;
    name: string;
    priceAttributes: PriceAttribute[];
    quantity: number;
    followUpActions: FollowUpAction[];
    image: TransactionImage;
    description: string;
    notes: string[];
}

export interface Contents {
    lineItems: LineItem[];
}

export interface PriceAttribute {
    name: string;
    type: PriceType;
    state: PriceState;
    amount: number;
    currencyCode: string;
}

export interface PaymentData {
    paymentResult: {
        googlePaymentData?: string; // future use
        merchantPaymentMethodId: string;
    };
    paymentInfo: {
        paymentMethodDisplayInfo: {
            paymentType: PaymentType;
            paymentMethodDisplayName: string; // VISA **** 1234
        };
        paymentMethodProvenance:ProvenanceType;
    }
}

export interface PurchaseReturnsInfo {
    isReturnable: boolean;
    daysToReturn: number;
    policyUrl: string
}

export interface TransactionLocation {
    zipCode: string;
    city: string;
    state: string;
    address: string;
    recipient: string;
    phoneNumber: string; // +1 703-595-7630
}

interface TransactionImage {
    url: string;
    accessibilityText: string;
}

export interface PickupInfo {
    pickupType: PickupType;
    curbsideInfo: {
        vehicle: {
            make: string;
            model: string;
        }
    }
}

export interface PurchaseFulfillmentInfo {
    id: string;
    fulfillmentType: FulfillmentType;
    expectedFulfillmentTimeMs: number;
    expectedPreparationTimeMs: number;
    location?: TransactionLocation;
    expireTime?: string;
    price: PriceAttribute;
    fulfillmentContact: SellerInfo;
    shippingMethodName?: string;
    storeCode: string;
    pickupInfo?: PickupInfo;
}

export interface PurchaseOrderExtension {
    status: PurchaseStatus;
    userVisibleStatusLabel: string;
    type: PurchaseType;
    returnsInfo: PurchaseReturnsInfo;
    fulfillmentInfo: PurchaseFulfillmentInfo;
    purchaseLocationType: PurchaseLocationType;
}

export interface OrderDescription {
    googleOrderId: string;
    merchantOrderId: string;
    userVisibleOrderId: string;
    userVisibleStateLabel: string;
    buyerInfo: BuyerInfo;
    image: TransactionImage;
    createTime: string;
    lastUpdateTime: string;
    transactionMerchant: MerchantInfo;
    contents: Contents;
    priceAttributes: PriceAttribute[];
    followUpActions: FollowUpAction[];
    paymentData: PaymentData;
    termsOfServiceUrl: string;
    note: string;
    purchase: PurchaseOrderExtension;
}
