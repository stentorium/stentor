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
 * - FormDateTimeInput: Combined date and appointment time picker
 */
export type FormField =
  | FormCardInput
  | FormTextInput
  | FormDropdownInput
  | FormChipsInput
  | FormDateInput
  | FormDateRangeInput
  | FormDateTimeInput;

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
  type: "TEXT" | "DROPDOWN" | "CHECK" | "CHIPS" | "DATE" | "DATERANGE" | "CARD" | "DATETIME";
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
  /**
   * When true, the user must select an address from the autocomplete suggestions.
   * Free-text entry is not allowed. Defaults to false (free-text allowed).
   */
  requireSelection?: boolean;
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
   * The current day stays available *until* the specified time, in HH:MM (24-hour) format.
   *
   * For example, "14:00" keeps today bookable up to 2:00 PM; after that, today is no longer offered.
   *
   * NOTE: the previous doc comment here described the inverse ("unavailable until 2:00 PM"). It was
   * wrong: consumers disable the current day once the current time is past this value, and the Studio
   * UI ("same-day booking allowed until…") has always matched that behavior rather than the old
   * comment. Corrected here so the semantics cannot be implemented backwards downstream.
   *
   * Same meaning as AvailabilityClass.currentDayAvailableUntil, which overrides this for jobs
   * resolved to a class.
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
 * A time of day in 24-hour "HH:MM" form, for example "09:30".
 *
 * Always interpreted in the timezone of the enclosing {@link TimeSlotSchedule},
 * never in the timezone of the browser rendering it.
 */
export type ClockTime = string;

/**
 * A contiguous span of time within a single day.
 */
export interface TimeSpan {
  /**
   * When the span opens.
   */
  start: ClockTime;
  /**
   * When the span closes. Slots are generated up to, but not including, this time.
   */
  end: ClockTime;
}

/**
 * A single entry in the time column of a date/time picker.
 *
 * Structurally compatible with the time members of {@link SelectableItem}, so an offering
 * converts to the item shape the chips field already submits.
 *
 * Omitting `end` produces a discrete appointment start ("9:30 AM"); supplying it produces
 * a window ("Morning, 8:00 AM - 12:00 PM"). A schedule may mix both.
 */
export interface TimeOffering {
  /**
   * Display label. When omitted, a label is formatted from `start` (and `end` when present).
   *
   * This is the value submitted for the field, so it is what a CRM or lead consumer receives.
   */
  label?: string;
  /**
   * When the appointment starts.
   */
  start: ClockTime;
  /**
   * When the appointment ends. Omit for a discrete start time with no stated end.
   */
  end?: ClockTime;
  /**
   * Optional heading this offering sits under, used to group a column that mixes
   * named windows with discrete times.
   */
  group?: string;
}

/**
 * An override of the weekly schedule for one specific date, such as a holiday
 * or a Saturday with shortened hours.
 */
export interface ScheduleException {
  /**
   * The date being overridden, in "YYYY-MM-DD" form.
   */
  date: string;
  /**
   * The spans open on this date. These *replace* the spans the weekday would otherwise
   * contribute rather than adding to them.
   *
   * An empty array means closed.
   */
  spans: TimeSpan[];
}

/**
 * How many appointments a slot or a day may absorb.
 *
 * @note - Reserved. Consumers must accept and persist this without acting on it; slot
 * consumption is not tracked yet, so `mode` is currently always "NONE".
 */
export interface SlotCapacityPolicy {
  /**
   * When a slot is considered consumed.
   *
   * - "NONE": capacity is not tracked, every generated slot stays selectable
   * - "ON_SUBMIT": a submitted lead consumes a slot
   * - "ON_CONFIRM": only an appointment confirmed by the business consumes a slot
   */
  mode: "NONE" | "ON_SUBMIT" | "ON_CONFIRM";
  /**
   * How many appointments may share one slot. A business with several technicians can
   * take more than one.
   */
  perSlot?: number;
  /**
   * How many appointments may be taken across a whole day.
   */
  perDay?: number;
}

/**
 * Defines which appointment times a date/time picker offers.
 *
 * Offerings are derived from this definition alone — there is no CRM or field-service
 * availability lookup behind it, so a schedule describes when a business is *open*,
 * not which times are still free.
 */
export interface TimeSlotSchedule {
  /**
   * IANA timezone the schedule is expressed in, for example "America/New_York".
   *
   * Required, because every other time in this object is a wall-clock time in the
   * business's zone and a visitor is frequently in a different one.
   */
  timezone: string;
  /**
   * Minutes between generated start times. Defaults to 30.
   */
  slotMinutes?: number;
  /**
   * How long an appointment lasts, in minutes. When set, each generated offering carries
   * an `end`. When omitted, offerings are discrete start times with no stated end.
   */
  durationMinutes?: number;
  /**
   * Spans the business is open, per weekday. More than one span expresses a break in
   * the day. A weekday that is missing or empty is closed.
   */
  days?: { [day in DayOfWeek]?: TimeSpan[] };
  /**
   * Date-specific overrides of `days`, for holidays and one-off hours.
   */
  exceptions?: ScheduleException[];
  /**
   * Hides offerings starting within this many minutes of now, so a visitor cannot book
   * a time the business has no chance to staff.
   */
  leadTimeMinutes?: number;
  /**
   * How many days ahead the picker allows. Defaults to 60.
   */
  horizonDays?: number;
  /**
   * An explicit list of offerings. When present this *replaces* generation — `days`,
   * `slotMinutes` and `durationMinutes` are not used.
   *
   * This is how a schedule expresses named windows, or a mix of windows and discrete times,
   * that a uniform interval cannot produce.
   */
  offerings?: TimeOffering[];
  /**
   * @note - Reserved, see {@link SlotCapacityPolicy}. Persisted but not acted on.
   */
  capacity?: SlotCapacityPolicy;
}

/**
 * Combined date and appointment time picker.
 *
 * Renders a calendar beside a column of appointment times generated from `schedule`,
 * so the times on offer follow the date the user picks. A single field owns both values,
 * but it submits them separately: the chosen time under the field's own `name`
 * (plus the `_start`/`_end` members a selectable item already contributes), the date under
 * `dateFieldName`, and a combined offset-bearing ISO timestamp under `dateTimeFieldName`.
 */
export interface FormDateTimeInput extends FormInput {
  type: "DATETIME";
  /**
   * Which appointment times to offer.
   */
  schedule: TimeSlotSchedule;
  /**
   * Field name the selected date is submitted under. Defaults to "preferred_date".
   */
  dateFieldName?: string;
  /**
   * Field name the combined date and time is submitted under, as an ISO 8601 string
   * carrying the schedule's UTC offset. Defaults to "datetime".
   */
  dateTimeFieldName?: string;
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
  /**
   * Optional start time for time window chips (e.g., "10:00" in 24-hour format or ISO time)
   */
  startTime?: string;
  /**
   * Optional end time for time window chips (e.g., "18:00" in 24-hour format or ISO time)
   */
  endTime?: string;
}
