/*! Copyright (c) 2019, XAPPmedia */
import { TemplateType } from "../Template";

/**
 * A collection of accounts that are linked to the organization.
 * The name is the type of account that is linked.
 * The object linked is unique to the account type, so it's up to the
 * client to know what that is.
 */
export interface Accounts {
    [accountName: string]: any;
}

/* eslint-disable @typescript-eslint/interface-name-prefix */

/**
 * The IP rights documents that exist for the various platforms.
 */
export interface IPRights {
    alexa?: string;
}
/* eslint-enable @typescript-eslint/interface-name-prefix */

/**
 * A Stripe account is a payment account associated with the user.
 */
export interface StripeAccount {
    /**
     * The ID of the customer in stripe that this organization is linked to.
     */
    customerId: string;
}

export interface ServiceOrderAccount {
    /**
     * The style of payment that the service order is a part of.
     */
    paymentType: string;
    /**
     * The number of apps that the service order allows.
     */
    numberOfApps?: number;
    /**
     * The date with which the service order was created.
     */
    date: string;
}

/**
 * The new form of `ServiceOrderAccount#numberOfApps`.  The key is the type of template
 * which can be found at `templates/Types`.
 */
export type ServiceOrderTemplate = Partial<Record<TemplateType, ServiceOrderAccount>>;

/**
 * The type for number of apps in a `ServiceOrderAccount`.
 *
 * The legacy parameter is a ServiceOrderAccount which represents Radio/Live stream templates only.
 *
 * The New Parameter is a ServiceOrderTemplate object in which the key is the service order
 * and the object returned is the service order supplied.
 */
export type ServiceOrders = ServiceOrderAccount | ServiceOrderTemplate;

/**
 * A collection of accounts associated with the payment on the stentor platform.
 */
export interface PaymentAccounts {
    /**
     * The stripe account that is linked to this organization.
     */
    stripe?: StripeAccount;
    /**
     * The Service order account that is linked to this organization.
     */
    so?: ServiceOrders;
}

/**
 * An organization is the name of organization contains a collection of groups.
 */
export interface Organization {
    /**
     * The unique identifier of the organization.
     */
    organizationId: string;
    /**
     * The public facing name of this organization.
     */
    name: string;
    /**
     * The public facing description of the group.
     */
    description: string;
    /**
     * Contact email for the organization.
     */
    contact?: string;
    /**
     * Contact name for the organization.
     */
    contactName?: string;
    /**
     * ContactPhone for the organization
     */
    contactPhone?: string;
    /**
     * Contract date
     */
    contractDate?: string;
    /**
     * Internally maintained notes for the organization
     */
    notes?: string;
    /**
     * Accounts that are linked to the organization that involve financial transactions.
     */
    paymentAccounts?: PaymentAccounts;
    /**
     * The group ID as it is in auth0.  This can be used to retrieve the permissions, roles, and nested groups that
     * the group may contain.
     */
    auth0GroupId?: string;
    /**
     * The remote location for the organization's image.
     */
    logoUrl?: string;
    /**
     * The main website that the organization owns.
     */
    website?: string;
    /**
     * The vendorId that is used for publishing.
     * For example, the accounts under "Smapi" will have a vendorId or
     * other metadata needed for publishing.
     */
    publishingAccounts?: Accounts;
    /**
     * IP Rights documents that are attached to this organization.
     */
    ipRights?: IPRights;
    /**
     * Internal SME/POC
     */
    XAPPLead?: string;
}
