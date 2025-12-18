/*! Copyright (c) 2024, XAPP AI */

import { DayOfWeek } from "../Services";

/**
 * Parameters for Google Maps Places Autocomplete API
 *
 * @see https://developers.google.com/maps/documentation/places/web-service/autocomplete
 */
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
  /**
   * Biases results to a specified location and radius.
   *
   * @see https://developers.google.com/maps/documentation/places/web-service/autocomplete#location_biasing
   */
  locationbias?: string;
  /**
   * Restricts results to a specified location and radius.
   *
   * @see https://developers.google.com/maps/documentation/places/web-service/autocomplete#location_restriction
   */
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

/**
 * Union type representing all possible form field types.
 *
 * Each form field type provides different input capabilities:
 * - FormCardInput: Display card with text/image
 * - FormTextInput: Text input with optional validation
 * - FormDropdownInput: Selection from dropdown list
 * - FormChipsInput: Multi-select chip interface
 * - FormDateInput: Single date picker
 * - FormDateRangeInput: Date range picker
 */
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
  /**
   * Optional, used to shape the input.  Not applicable to all inputs.
   */
  shape?: "ROUND" | "SQUARE";
  /**
   * A condition that must be met for the field to be shown.
   *
   * For example: "issue === 'service_repair'" - issue is a field name in this example
   *
   */
  condition?: string;
  /**
   * Is the field required.
   */
  mandatory?: boolean;
  /**
   * Error message to show when the field is required but not filled out.
   */
  mandatoryError?: string;
  /**
   * Group fields together where one of the fields in the group is required.
   */
  mandatoryGroup?: string;
  /**
   * React.CSSProperties style object to apply to the field.
   *
   * For example: {{ width: '300px', height: '150px' }}
   */
  style?: object;
}

/**
 * Specialized text input for address entry with autocomplete functionality.
 *
 * Extends FormTextInput to provide Google Maps Places Autocomplete
 * integration for address suggestions.
 */
export interface FormFieldTextAddressInput extends FormTextInput {
  format: "ADDRESS";
  /**
   * Base URL of an endpoint that adheres to the Google Maps Location Autocomplete API.
   *
   * This can be either the official Google Maps API endpoint or a custom
   * proxy endpoint that implements the same interface.
   */
  mapsBaseUrl?: string;
  /**
   * Optional query parameters to help limit the results returned by the Google Maps Autocomplete API.
   *
   * Use these parameters to restrict results by country, location, or other criteria.
   */
  mapsUrlQueryParams?: AddressAutocompleteParameters;
  /**
   * Required when you are using the official Google Maps Autocomplete API.
   *
   * Not needed if using a custom proxy endpoint that handles authentication.
   */
  googleMapsApiKey?: string;
}

/**
 * Text input field with optional validation and formatting.
 *
 * Supports both single-line and multi-line text input with various
 * format validators (phone, email, address, zip code).
 */
export interface FormTextInput extends FormInput {
  /**
   * When true, renders as a textarea instead of a single-line input
   */
  multiline?: boolean;
  /**
   * Format validation to apply to the input. Default is free text with no validation.
   */
  format?: "PHONE" | "EMAIL" | "ADDRESS" | "ZIP_CODE";
  /**
   * Placeholder text shown when the input is empty
   */
  placeholder?: string;
  /**
   * Accessible label for the input field
   */
  label?: string;
  /**
   * Number of rows for textarea (only applicable when multiline is true)
   */
  rows?: number;
  /**
   * Maximum number of rows for textarea (only applicable when multiline is true)
   */
  rowsMax?: number;
  /**
   * Maximum character length allowed for the input
   */
  maxLength?: number;
}

/**
 * Dropdown selection field.
 *
 * Displays a list of selectable items in a dropdown menu.
 */
export interface FormDropdownInput extends FormInput {
  /**
   * List of items available for selection in the dropdown
   */
  items: SelectableItem[];
  /**
   * Maximum character length allowed for freeform text input (e.g., "other" option)
   */
  maxLength?: number;
}

/**
 * Close/Open style chips selection field.
 *
 * Displays items as chips that can be selected/deselected.
 * Header plus open symbol reveals the chips.
 */
export interface FormChipsInput extends FormInput {
  type: "CHIPS";
  /**
   * When true, allows only single selection (radio button behavior).
   * When false or undefined, allows multiple selections.
   */
  radio?: boolean;
  /**
   * Whether the chips are shown by default or collapsed
   */
  defaultOpen?: boolean;
  /**
   * Minimum number of items that must be selected
   */
  minRequired?: number;
  /**
   * Maximum number of items that can be selected
   */
  maxAllowed?: number;
  /**
   * List of selectable or actionable items to display as chips
   */
  items: (SelectableItem | ActionableItem)[];
}

/**
 * Selection field similar to chips but rendered with checkboxes.
 *
 * Provides a checkbox or radio button interface for item selection.
 */
export interface FormSelectInput extends FormInput {
  /**
   * When true, allows only single selection (radio button behavior).
   * When false or undefined, allows multiple selections with checkboxes.
   */
  radio?: boolean;
  /**
   * Whether the selection list is shown by default or collapsed
   */
  defaultOpen?: boolean;
  /**
   * List of selectable items to display
   */
  items: SelectableItem[];
}

/**
 * Card display field for showing text and/or images.
 *
 * Provides a rich card-based display component with optional header,
 * media content, and body text.
 */
export interface FormCardInput extends FormInput {
  /**
   * Optional header section with title and subheader
   */
  header?: {
    /**
     * Main title text for the card header
     */
    title: string;
    /**
     * Optional subtitle or secondary text
     */
    subheader?: string;
  };
  /**
   * Optional media section for displaying images
   */
  media?: {
    /**
     * Height of the media in pixels
     */
    height?: number;
    /**
     * Width of the media in pixels
     */
    width?: number;
    /**
     * URL of the image to display
     */
    imageUrl: string;
    /**
     * Alternative text for accessibility
     */
    alt?: string;
  };
  /**
   * Body text content for the card
   */
  text?: string;
  /**
   * Visual variant style for the card
   */
  variant?: string;
  /**
   * Color scheme for the card
   */
  color?: string;
  /**
   * Text alignment: "left", "center", "right", or "justify"
   */
  align?: string;
}

/**
 * Configuration for marking days as busy/unavailable in date selection.
 *
 * Used to control which days can be selected in date input fields,
 * typically for appointment scheduling or availability management.
 */
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
   * If it is a weekend and weekends are blocked, then it will be disregarded.
   */
  readonly blockCurrentDay?: boolean;
  /**
   * Blocks the current day until the specified time. This is in the format of HH:MM.
   *
   * For example, "14:00" would make the current day unavailable until 2:00 PM.
   */
  readonly currentDayAvailableUntil?: string;
  /**
   * Blocks the next number of business days.
   *
   * One business day will block the next business day.
   *
   * If this is set, it will override the availableDays, blockWeekends, and blockCurrentDay.
   */
  readonly blockNextBusinessDays?: number;
}

/**
 * Single date picker input field.
 *
 * Allows users to select a single date with optional
 * preselection and busy day configuration.
 */
export interface FormDateInput extends FormInput {
  /**
   * Date to preselect when the date picker is displayed
   */
  preselecteDate?: Date;
  /**
   * Default busy days that will show as unavailable.
   *
   * These are only used when busy days are not provided by the FSM
   */
  defaultBusyDays?: BusyDayDescription;
}

/**
 * Date range picker input field.
 *
 * Allows users to select a start and end date range.
 */
export interface FormDateRangeInput extends FormInput {
  /**
   * Date range to preselect when the date picker is displayed
   */
  preselecteDates?: {
    /**
     * Start date of the range
     */
    from?: Date;
    /**
     * End date of the range
     */
    to?: Date;
  };
}

/**
 * An item that can be clicked to perform an action (e.g., navigate to a URL).
 *
 * Used in form fields like chips to provide actionable items that
 * trigger navigation or other actions when clicked.
 */
export interface ActionableItem {
  /**
   * Display label shown to the user
   */
  label: string;
  /**
   * Unique identifier for the item. This is what is sent to the server
   * and should be a human-readable form of the label.
   */
  id: string;
  /**
   * URL to navigate to when the item is clicked
   */
  url: string;
}

/**
 * A selectable item used in dropdowns, chips, and other selection fields.
 *
 * Represents a name-value pair with optional preselection state.
 */
export interface SelectableItem {
  /**
   * Display label shown to the user
   */
  label: string;
  /**
   * Unique identifier for the item. This is what is sent to the server
   * and should be a human-readable form of the label.
   */
  id: string;
  /**
   * When true, the item will be shown as selected by default
   */
  selected?: boolean;
}
