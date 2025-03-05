/*! Copyright (c) 2024, XAPP AI */

import { DayOfWeek } from "../Services";

export interface AddressAutocompleteParameters {
  /**
   * This will look like components=country:us or components=country:us|country:ca
   *
   * @see https://developers.google.com/maps/documentation/places/web-service/autocomplete#components
   */
  components?: string;
  /**
   * The text string on which to search. The Places service will return candidate matches based on this string and order results based on their perceived relevance.
   */
  language?: string;
  /**
   * A text that is the lat & long of the location to use as the center of the search.
   *
   * For example, location=37.76999,-122.44696
   */
  location?: string;
  locationbias?: string;
  locationrestriction?: string;
  /**
   * When using location with a specific lat & long, this must be provided.
   *
   * This is in meters
   */
  radius?: string;
  /**
   * The API key, only required when using the official Google Maps API.
   */
  key?: string;
}

export type FormField =
  | FormCardInput
  | FormTextInput
  | FormDropdownInput
  | FormChipsInput
  | FormDateInput
  | FormDateRangeInput;

/**
 * Form field base class
 */
export interface FormInput {
  /**
   * Name of the form input, this is not human readable and is used to identify the field.
   *
   * For example: "SERVICE" or "FULL_NAME"
   */
  name: string;
  /**
   * Optional title used to display on the input
   */
  title?: string;
  /**
   * Type of the input
   */
  type: "TEXT" | "DROPDOWN" | "CHECK" | "CHIPS" | "DATE" | "DATERANGE" | "CARD";
  shape?: "ROUND" | "SQUARE";

  // Like "issue === 'service_repair'" - issue is a field name in this example
  // ths is to support conditional dropdowns
  condition?: string;

  mandatory?: boolean;
  mandatoryError?: string;

  style?: object; // {{ width: '300px', height: '150px' }}
}

export interface FormFieldTextAddressInput extends FormTextInput {
  format: "ADDRESS";
  /**
   * Base URL of an endpoint that adheres to the Google Maps Location Autocomplete API.
   */
  mapsBaseUrl?: string;
  /**
   * Optional query parameters to help limit the results returned by the Google Maps Autocomplete API.
   */
  mapsUrlQueryParams?: AddressAutocompleteParameters;
  /**
   * Required when you are using the official Google Maps Autocomplete API.
   */
  googleMapsApiKey?: string;
}

/**
 * Text input. Validate according to the format.
 */
export interface FormTextInput extends FormInput {
  multiline?: boolean; // render text area
  format?: "PHONE" | "EMAIL" | "ADDRESS"; // ... default is free text
  placeholder?: string;

  label?: string;

  // When textarea
  rows?: number;
  rowsMax?: number;
}

/**
 * Dropdown
 */
export interface FormDropdownInput extends FormInput {
  items: SelectableItem[];
}

/**
 * Close/Open style chips selection. Header plus open symbol reveals the chips.
 */
export interface FormChipsInput extends FormInput {
  type: "CHIPS";
  radio?: boolean; // single select
  defaultOpen?: boolean;

  minRequired?: number;
  maxAllowed?: number;

  items: SelectableItem[];
}

/**
 * Like chips but with checkboxes
 */
export interface FormSelectInput extends FormInput {
  radio?: boolean; // single select
  defaultOpen?: boolean;

  items: SelectableItem[];
}

/**
 * Card (text/image)
 */
export interface FormCardInput extends FormInput {
  header?: {
    title: string;
    subheader?: string;
  };

  media?: {
    height?: number;
    width?: number;
    imageUrl: string;
    alt?: string;
  };

  text?: string;
  variant?: string;
  color?: string;
  align?: string; // text alignment, which can be set to "left," "center," "right," or "justify."
}

export interface BusyDayDescription {
  /**
   * The days of the week that are available for appointments.
   */
  readonly availableDays?: DayOfWeek[];
  /**
   * Blocks all weekends
   *
   * If provided, it will override the availableDays.
   */
  readonly blockWeekends?: boolean;
  /**
   * Blocks the current day.
   *
   * If it is a weekend and weekends are not blocked, it will be blocked.
   * If it is a weekend and weekends are blocked, the it will be disregarded.
   */
  readonly blockCurrentDay?: boolean;
  /**
   * Blocks the current day until the specified time.  This is in the format of HH:MM.
   */
  readonly currentDayAvailableUntil?: string;
  /**
   * Blocks the next number of business days.
   *
   * One business day will bock the next business day.
   *
   * If this is set, it will override the availableDays, blockWeekends, and blockCurrentDay.
   */
  readonly blockNextBusinessDays?: number;
}

/**
 * Single date
 */
export interface FormDateInput extends FormInput {
  preselecteDate?: Date;
  /**
   * Default busy days that will show as unavailable.
   *
   * These are only used when busy days are not provided by the FSM
   */
  defaultBusyDays?: BusyDayDescription;
}

/**
 * Date range
 */
export interface FormDateRangeInput extends FormInput {
  preselecteDates?: { from?: Date; to?: Date };
}

/**
 * Basically a name value pair for dropdowns or chips
 */
export interface SelectableItem {
  /**
   * Display label
   */
  label: string;
  /**
   * ID of the item. This is what is sent to the server and should be a form of the label that is human readable.
   */
  id: string;
  /**
   * Option to show the item as selected
   */
  selected?: boolean;
}
