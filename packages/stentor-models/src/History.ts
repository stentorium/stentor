/*! Copyright (c) 2019, XAPPmedia */
export interface HandlerHistoryData {
  /**
   * The ID for the session the handler was played in.
   *
   * @type {string}
   * @memberof HandlerHistoryData
   */
  sessionId: string;
  /**
   * The id of the handler.
   *
   * @type {string}
   * @memberof HandlerHistoryData
   */
  intentId: string;
  /**
   * The timestamp the handler was requested.
   *
   * @type {number}
   * @memberof HandlerHistoryData
   */
  timestamp: number;
}

/**
 * Historical data for a user's previous listening.
 *
 * @export
 * @interface PlayableHistoryData
 */
export interface PlayableHistoryData {
  /**
   * The time into playback, in milliseconds, the users is for the current playable.
   *
   * It is undefined if the playable hasn't started and -1 if it finished playback.
   *
   * @type {number}
   * @memberof PlayableHistoryData
   */
  currentTime: number;
  /**
   * The UNIX timestamp for the last time the item was played.
   *
   * @type {number}
   * @memberof PlayableHistoryData
   */
  lastPlayed: number;
}

export type HistoryData = PlayableHistoryData | {}; // The {} is required for legacy support

/**
 * History is a map to store information about recent activity for the user by some hashed token that
 * links back to the content.
 *
 * For PlayableHistoryData, the token is the token for the track, for HandlerHistoryData the token is the ID of the Handler.
 *
 * @export
 * @interface History
 */
export interface History {
  lastTrimmed?: number;
  handler?: HandlerHistoryData[];
}
