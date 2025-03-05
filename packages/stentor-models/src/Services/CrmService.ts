/*! Copyright (c) 2022, XAPPmedia */

import { CrmResponse, ExternalLead } from "../Crm";
import { DateTime, DateTimeRange } from "../DateTime";
import { BusyDayDescription } from "../Form";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface AvailabilityClass {
  /**
   * ID for the availability class, typically the slugged name.
   */
  id: string;
  /**
   * Human readable name of the availability class
   */
  name: string;
  /**
   * Summary of the availability class.  This is used to describe the availability class so the AI can match it to user input.  It contains high level description as well as examples of input that would match to this class.
   */
  summary: string;
  /**
   * Minimum number of days out that can be scheduled for this type.
   *
   * This is independent of if the day is available or not.
   *
   * Value of 0 is the default if not provided, meaning same day could be available.
   */
  numberOfDaysOut?: number;
  /**
   * Maximum number of appointments that can be scheduled per day for this type.
   *
   * If not provided, it is assumed to be unlimited.
   */
  appointmentsPerDay?: number;
  /**
   * If true, this availability class is only for leads and not for appointments as they typically require more information and followup.
   */
  leadOnly?: boolean;
}

/**
 * Settings for the availability of the CRM service.
 */
export interface CrmServiceAvailabilitySettings {
  /**
   * The days of the week they are available to schedule appointments through the scheduler.
   */
  availableDays?: DayOfWeek[];
  /**
   * These are holidays or any other days specific to the business that they are not available for appointments.
   */
  blockedDays?: DateTime[];
  /**
   * Maximum total number of appointments a day that can be scheduled through the scheduler.
   */
  maxTotalDailyAppointments?: number;
  /**
   * Job types, where we only schedule a few days (3) ahead
   */
  delayedJobTypes?: string[];
  /**
   * The customer specific "availability classes" that describes the scheduling strategy for job types.
   */
  availabilityClasses?: AvailabilityClass[];
  /**
   * The default availability class (when the AI cannot figure it out)
   */
  defaultAvailabilityClass?: string;
  /**
   * The default busy days for the business.  This is used when the FSM/Scheduling backend does not provide busy days
   */
  defaultBusyDays?: BusyDayDescription;
}

export interface CrmServiceTimeAvailability {
  /**
   * The time slot
   */
  range: DateTimeRange;
  /**
   * If the time slot is available.
   */
  available: boolean;
}

export interface CrmServiceDateAvailability {
  /**
   * Typically, just the date is used, tz and time are not needed.
   */
  date: DateTime;
  /**
   * If the day has any availability for appointments.
   */
  available: boolean;
  /**
   * The number of remaining available appointments.
   */
  remainingAppointments?: number;
  /**
   * Blocked time slots for the day.
   *
   * These are only blocked times during their normal business hours.
   *
   * @note - This is only for future consideration.
   */
  blockedTimeSlots?: CrmServiceTimeAvailability[];
}

export interface CrmServiceAvailability {
  /**
   * The range
   */
  range: DateTimeRange;
  /**
   * Availability for each date in the range.
   *
   * If the date is not included in the array, it is assumed to be available.
   */
  unavailabilities: CrmServiceDateAvailability[];
}

export interface CrmServiceAvailabilityOptions
  extends CrmServiceAvailabilitySettings {
  /**
   * Job Type to filter availability by.
   *
   * This allows to display availability for a specific job type, which can be different.
   */
  jobType?: CrmServiceJobType;
}

export interface CrmServiceJobType {
  /**
   * The job type id.
   */
  id: string;
  /**
   * The job type name.
   */
  name?: string;

  class?: string;
}

export interface CrmService {
  /**
   * Send information about a lead to the CRM.
   *
   * This can be used to either create a lead or append data to an existing lead.
   *
   * The existing lead can be determined by the refId on the ExternalLead information or by attempting to match data such as email or phone number.
   *
   * @param externalLead Lead information
   * @param extras Optional additional metadata to pass to the CRM
   */
  send(
    externalLead: ExternalLead,
    extras?: Record<string, unknown>
  ): Promise<CrmResponse>;
  /**
   * Updates a lead if the user provides more information after the lead has been sent.
   *
   * It leverages the refId on the externalLead, which is originally provided in the CrmResponse to properly
   *
   * @deprecated Use send with a refId on the externalLead and call send() again.  This will update.
   *
   * @param externalLead
   * @param extras
   */
  update?(
    externalLead: ExternalLead,
    extras?: Record<string, unknown>
  ): Promise<CrmResponse>;
  /**
   * Returns availability for scheduling an appointment with the business.
   *
   * @param range
   * @param options
   */
  getAvailability(
    range: DateTimeRange,
    options?: CrmServiceAvailabilityOptions
  ): Promise<CrmServiceAvailability>;
  /**
   * Returns the job type (id) for the free text job description (AI call usually)
   *
   * @param message
   */
  getJobType(
    message: string,
    externalLead?: ExternalLead
  ): Promise<CrmServiceJobType>;
}

export type CrmServiceProps = CrmServiceAvailabilitySettings;

export class AbstractCrmService implements CrmService {
  protected availableDays?: DayOfWeek[];

  protected blockedDays?: DateTime[];

  protected maxTotalDailyAppointments?: number | undefined;

  protected delayedJobTypes?: string[];

  public constructor(props: CrmServiceProps) {
    if (props.availableDays) {
      this.availableDays = props.availableDays;
    }

    if (props.blockedDays) {
      this.blockedDays = props.blockedDays;
    }

    if (typeof props.maxTotalDailyAppointments === "number") {
      this.maxTotalDailyAppointments = props.maxTotalDailyAppointments;
    }

    if (typeof props.delayedJobTypes) {
      this.delayedJobTypes = props.delayedJobTypes;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async send(
    externalLead: ExternalLead,
    extras?: Record<string, unknown>
  ): Promise<CrmResponse> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getAvailability(
    range: DateTimeRange,
    options?: CrmServiceAvailabilityOptions
  ): Promise<CrmServiceAvailability> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getJobType(
    message: string,
    externalLead?: ExternalLead
  ): Promise<CrmServiceJobType> {
    throw new Error("Method not implemented.");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async update?(
    externalLead: ExternalLead,
    extras?: Record<string, unknown>
  ): Promise<CrmResponse> {
    throw new Error("Method not implemented.");
  }
}
