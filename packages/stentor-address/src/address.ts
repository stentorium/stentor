/*! Copyright (c) 2025, XAPP AI */
import { AddressIntentRequestSlotMap } from "stentor-models";
import { pruneEmpty } from "stentor-utils";

import * as addresser from "addresser";

export interface ParsedAddress extends Omit<addresser.IParsedAddress, "id" | "zipCode"> {
  formattedAddress?: string;
  /**
   * Direction such as NW, SE, etc.
   */
  streetDirection?: string;
  /**
   * Zip/Postal Code
   */
  zipCode?: string;
  /**
   * Place name, typically the city or town.
   */
  placeName: string;
  /**
   * An ID for the address.
   *
   * @note It is not recommended to use this.
   */
  id?: string;
}

/**
 * Custom fallback parser for address strings.
 *
 * @param formattedAddress
 * @returns Parsed address in the format of IParsedAddress
 */
function customParseAddress(formattedAddress: string): ParsedAddress {
  const parsedAddress: ParsedAddress = {
    zipCode: "",
    stateAbbreviation: "",
    stateName: "",
    placeName: "",
    addressLine1: "",
    streetNumber: "",
    streetSuffix: "",
    streetName: "",
    id: "",
  };

  const parts = formattedAddress.split(",").map((part) => part.trim());

  if (parts.length === 4) {
    // Format: "Street, City, State/Province PostalCode, Country"
    parsedAddress.addressLine1 = parts[0];
    parsedAddress.placeName = parts[1];

    const statePostal = parts[2].split(" ");

    if (statePostal.length > 1 && /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(statePostal.slice(-2).join(" "))) {
      parsedAddress.stateAbbreviation = statePostal.slice(0, -2).join(" ");
      parsedAddress.zipCode = statePostal.slice(-2).join(" ");
    } else {
      parsedAddress.stateAbbreviation = statePostal.slice(0, -1).join(" ");
      parsedAddress.zipCode = statePostal[statePostal.length - 1];
    }

    parsedAddress.stateName = parsedAddress.stateAbbreviation; // Fallback since the full name isn't provided
  } else if (parts.length === 3) {
    // Format: "City, State/Province PostalCode, Country"
    parsedAddress.placeName = parts[0];

    const statePostal = parts[1].split(" ");

    if (statePostal.length > 1 && /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/.test(statePostal.slice(-2).join(" "))) {
      parsedAddress.stateAbbreviation = statePostal.slice(0, -2).join(" ");
      parsedAddress.zipCode = statePostal.slice(-2).join(" ");
    } else {
      parsedAddress.stateAbbreviation = statePostal.slice(0, -1).join(" ");
      parsedAddress.zipCode = statePostal[statePostal.length - 1];
    }

    parsedAddress.stateName = parsedAddress.stateAbbreviation; // Fallback since the full name isn't provided
  } else {
    console.warn("Unexpected address format:", formattedAddress);
  }

  parsedAddress.id = `${parsedAddress.placeName}-${parsedAddress.zipCode}-${parsedAddress.addressLine1}`
    .replace(/\s+/g, "-")
    .toLowerCase();
  return parsedAddress;
}

/**
 * Attempts to parse an address from a string.
 *
 * @param address
 * @returns Parsed address in ParsedAddress format
 */
export function parseAddress(address: string): ParsedAddress | undefined {
  let addressed: ParsedAddress;

  try {
    addressed = addresser.parseAddress(address);
  } catch (e) {
    // Not a valid address
    // Fallback to custom parser
    addressed = customParseAddress(address);
  }

  return addressed;
}

/**
 * Forms an address string from from the slots.
 *
 * @param slots
 * @returns
 */
export function formAddressFromSlots(slots: AddressIntentRequestSlotMap): string {
  const hasCity = slots.city && slots.city.value;
  const hasState = slots.state && slots.state.value;

  let address = "";

  if (slots.street_number && slots.street_number.value) {
    address += slots.street_number.value + " ";
  }

  if (slots.street && slots.street.value) {
    // make sure we aren't adding the street number twice
    // see if street starts with street number, if it does don't add it
    if (slots.street.value.trim().startsWith(address.trim())) {
      // just replace it since it is a dupe
      address = slots.street.value + " ";
    } else {
      address += slots.street.value + " ";
    }
  } else if (slots.street_name && slots.street_name.value) {
    address += slots.street_name.value + " ";
  }

  // if we have quadrant and it isn't already in the street name
  if (
    slots.quadrant &&
    slots.quadrant.value &&
    !address.trim().toLowerCase().endsWith(slots.quadrant.value.toLowerCase())
  ) {
    address += slots.quadrant.value + " ";
  }

  if (hasCity || hasState) {
    address = address.trim();
    address += ", ";
  }

  if (slots.city && slots.city.value) {
    if (hasState) {
      address += slots.city.value + ", ";
    } else {
      address += slots.city.value + " ";
    }
  }

  if (slots.state && slots.state.value) {
    address += slots.state.value + " ";
  }

  if (slots.zip && slots.zip.value) {
    address += slots.zip.value;
  }

  return address.trim();
}

/**
 * Attempts to parse an address from a string.
 *
 * @param address
 * @returns
 */
export function parseAddressAsSlots(address: string): AddressIntentRequestSlotMap {
  const slots: AddressIntentRequestSlotMap = {};

  let addressed: addresser.IParsedAddress;

  try {
    addressed = addresser.parseAddress(address);
  } catch (e) {
    // not a valid address
    console.warn(`Unable to parse address string "${address}"`);
  }

  if (addressed) {
    // Pull out the zipCode
    slots.zip = {
      name: "zip",
      value: addressed.zipCode,
    };

    slots.city = {
      name: "city",
      value: addressed.placeName,
    };

    slots.state = {
      name: "state",
      value: addressed.stateName,
    };

    slots.street_number = {
      name: "street_number",
      value: addressed.streetNumber,
    };

    slots.street = {
      name: "street",
      value: addressed.addressLine1,
    };

    slots.street_name = {
      name: "street_name",
      value: addressed.addressLine1.replace(addressed.streetNumber, "").trim(),
    };

    const fullAddress = formAddressFromSlots(slots);
    if (fullAddress) {
      slots.address = {
        name: "address",
        value: fullAddress,
      };
    }
  }

  return slots;
}

/**
 * Takes an input and attempts to parse out all the components
 *
 * It can be passed a partial address object and will attempt to fill in the missing components if a fullAddress is provided
 *
 * @param input
 */
export function getAddressComponents(input: string | Partial<ParsedAddress>): ParsedAddress {
  let parsedAddress: ParsedAddress;

  if (typeof input === "string") {
    parsedAddress = parseAddress(input);
  } else {
    parsedAddress = input as ParsedAddress;
  }

  // do some tests to make sure we have all the components
  if (!parsedAddress.stateAbbreviation || !parsedAddress.stateName) {
    // attempt to parse the address section and merge it in
    const parsedFormattedAddress = parseAddress(parsedAddress.formattedAddress || parsedAddress.addressLine1);
    // clean off the parsedFormattedAddress to remove any empty strings & values
    const pruned = pruneEmpty(parsedFormattedAddress);
    parsedAddress = { ...parsedAddress, ...pruned };
  }

  if (!parsedAddress.id) {
    // id is just concatenation of the address
    let id = "";
    if (parsedAddress.addressLine1) {
      id += `${parsedAddress.addressLine1},`;
    }
    if (parsedAddress.placeName) {
      id += `-${parsedAddress.placeName},`;
    }
    if (parsedAddress.stateName) {
      id += `-${parsedAddress.stateName}`;
    }
    if (parsedAddress.zipCode) {
      id += `-${parsedAddress.zipCode}`;
    }

    parsedAddress.id = id.replace(/\s+/g, "-");
  }

  return parsedAddress;
}
