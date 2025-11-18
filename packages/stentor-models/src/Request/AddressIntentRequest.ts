/*! Copyright (c) 2025, XAPP AI */
import { IntentRequest, RequestSlotMap, RequestSlot } from "./IntentRequest";

export interface AddressIntentRequestSlotMap extends RequestSlotMap {
  /**
   * Fully formed address with street number, street name, quadrant, city, state, and zip code.
   *
   * On chat, this can sometimes be derived from the NLU's entity extraction.
   */
  address?: RequestSlot<string>;
  /**
   * City name.
   */
  city?: RequestSlot<string>;
  /**
   * State or Province.  Can be a two letter abbreviation or full name.
   */
  state?: RequestSlot<string>;
  /**
   * Zip code.
   */
  zip?: RequestSlot<string>;
  /**
   * Street name and number.
   */
  street?: RequestSlot<string>;
  /**
   * Street name.
   */
  street_name?: RequestSlot<string>;
  /**
   * Street number, only
   */
  street_number?: RequestSlot<string>;
  /**
   * Quadrant, if applicable.
   */
  quadrant?: RequestSlot<string>;
}

export interface AddressIntentRequest extends IntentRequest {
  /**
   * An intent that can parse an address query
   */
  intentId: string;
  /**
   * The slots
   */
  slots: AddressIntentRequestSlotMap;
}
