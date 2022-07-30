// A subset of https://en.wikipedia.org/wiki/ISO_8601

/**
 * Years are represented from the gregorian calendar only
 * as 0000 to 9999. (If anyone has to worry about after 9999
 * with this code, I am deeply sorry.) Technically 0000 -
 * 1582 are not allowed by the standard except by mutual
 * agreement between parties. This is explicitly forced
 * when validating in order to ensure we are only working
 * with data browsers can reasonably parse and get correct.
 */
const yearPattern = /(?<year>158[3-9]|159\d|1[6-9]\d{2}|[2-9]\d{3})/;
/**
 * Months are always 2-digits in a non-index format.
 * This differs from JavaScripts Date constructor for
 * example where months are 0-11 rather than ISO's 1-12.
 */
const monthPattern = /(?<month>0[1-9]|1[0-2])/;
/**
 * Days are always 2 digits.
 * 01-09, 10-19, 20-29, 30-31.
 */
const dayPattern = /(?<day>0[1-9]|[12]\d|3[01])/;
/**
 * Hours are always 2 digits and in 24 hour time.
 * 01-19, 20-23
 */
const hourPattern = /(?<hour>[01]\d|2[0-3])/;
/**
 * Minutes are alays 2 digits.
 */
const minutePattern = /(?<minute>[0-5]\d)/;
/**
 * Seconds are always 2 digits.
 * 60 is used to represent leap seconds.
 */
const secondsPattern = /(?<seconds>([0-5]\d)|60)/;
/**
 * Millisesconds are always 3 digits.
 * From 000-999.
 * The period to denote them is required if MS are present.
 */
const millisecondsPattern = /(?:\.(?<milliseconds>\d{3}))?/;

/**
 * Timezone is complex and difficult to break down further
 * since it is all one group.
 * Gist of it is timezones have 4 possible modes:
 * * Positive Offset
 * * Negative Offset
 * * 'Z' string for UTC time (+00:00)
 * * Unqualified (not present) (meaning local time.)
 *
 * With subgroups this could be made to give specific
 * outputs like `positiveOffset`, `negativeOffset`, or
 * `utcString` for determining which timezone style is
 * present.
 * However, without a use-case this effort wasn't completed
 * only validated that it could be possible.
 *
 * This pattern technically allows a bit more than standards
 * currently have. Up to +14:45 and down to -12:45. Should
 * anyone care to correct this and make it more strict, go
 * ahead just add tests to prove it when you do.
 */
const fullTimeZonePattern = /(?<offset>([+]((0\d|1[0-3])(?::(00|15|30|45))?|14(?::00)?)|([-]((0\d|1[0-1])(?::(00|15|30|45))?|12(?::00)?)|Z))?)/;

/**
 * Pattern to determine if a full calendar date is present.
 */
const fullCalendarDatePattern = yearPattern.source +
    /-/.source +
    monthPattern.source +
    /-/.source +
    dayPattern.source;

/**
 * Pattern to validate a complete date and time string.
 */
const fullIso8601DateTimePattern = /^/.source +
    yearPattern.source +
    /-?/.source +
    monthPattern.source +
    /-?/.source +
    dayPattern.source +
    /T/.source +
    hourPattern.source +
    /:?/.source +
    minutePattern.source +
    /:?/.source +
    secondsPattern.source +
    millisecondsPattern.source +
    fullTimeZonePattern.source +
    /$/.source;

const iso8601Date = new RegExp(
    `^${fullCalendarDatePattern}$`,
);
const isIso8601DateTime = new RegExp(
    fullIso8601DateTimePattern,
);

export interface DateStructure {
  year: number;
  month: number;
  day: number;
}

export interface TimeStructure {
  hour: number;
  minute: number;
  seconds: number;
  milliseconds: number;
  offset: string | undefined;
}

export type DateTimeStructure = DateStructure &
    TimeStructure;

export const parseDateTimeString = function(value: string):
    DateTimeStructure {
  const {groups} = isIso8601DateTime.exec(value) || {};

  const parseWasUnsuccessful = groups === undefined;
  if (parseWasUnsuccessful === true) {
    throw new Error(
        'Invalid date and time string given to parse',
    );
  }

  const offset = groups.offset !== "" ?
      groups.offset :
      undefined;

  return {
    year: parseInt(
        groups.year,
        10,
    ),
    month: parseInt(
        groups.month,
        10,
    ),
    day: parseInt(
        groups.day,
        10,
    ),
    hour: parseInt(
        groups.hour,
        10,
    ),
    minute: parseInt(
        groups.minute,
        10,
    ),
    seconds: parseInt(
        groups.seconds,
        10,
    ),
    milliseconds: parseInt(
        groups.milliseconds,
        10,
    ),
    offset,
  };
};

export const isValidDate = function(value: string):
    boolean {
  return iso8601Date.test(value);
};

export const isValidDateTime = function(value: string):
    boolean {
  return isIso8601DateTime.test(value);
};

export const parseDateString = function(value: string):
    DateStructure {
  const {groups} = iso8601Date.exec(value) || {};

  const parseWasUnsuccessful = groups === undefined;
  if (parseWasUnsuccessful === true) {
    throw new Error('Invalid date string given to parse');
  }

  return {
    year: parseInt(
        groups.year,
        10,
    ),
    month: parseInt(
        groups.month,
        10,
    ),
    day: parseInt(
        groups.day,
        10,
    ),
  };
};
