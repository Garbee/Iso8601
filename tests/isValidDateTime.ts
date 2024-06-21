import test from 'ava';
import {
  isValidDateTime,
  parseDateTimeString,
} from '@garbee/iso8601';

const removeSeparators = function(string: string) {
  return string
      .replace(
          '-',
          '',
      )
      .replace(
          ':',
          '',
      );
};

test(
    'allows any valid timezone offset',
    (t) => {
      const templateFn = (offset) => {
        return `2022-02-03T17:07:12.000${offset}`;
      };
      const validOffsets = [
        'Z',
        '-12',
        '-11',
        '-10',
        '-09',
        '-08',
        '-07',
        '-06',
        '-05',
        '-04',
        '-03',
        '-02',
        '-01',
        '-00',
        '-12:00',
        '-11:00',
        '-10:00',
        '-09:30',
        '-09:00',
        '-08:00',
        '-07:00',
        '-06:00',
        '-05:00',
        '-04:00',
        '-03:30',
        '-03:00',
        '-02:00',
        '-01:00',
        '-00:00',
        '+00:00',
        '+01:00',
        '+02:00',
        '+03:00',
        '+03:30',
        '+04:00',
        '+04:30',
        '+05:00',
        '+05:30',
        '+05:45',
        '+06:00',
        '+06:30',
        '+07:00',
        '+08:00',
        '+08:45',
        '+09:00',
        '+09:30',
        '+10:00',
        '+10:30',
        '+11:00',
        '+12:00',
        '+12:45',
        '+13:00',
        '+14:00',
        '+00',
        '+01',
        '+02',
        '+03',
        '+04',
        '+05',
        '+06',
        '+07',
        '+08',
        '+09',
        '+10',
        '+11',
        '+12',
        '+13',
        '+14',
      ];

      validOffsets.forEach((offset) => {
        const val = templateFn(offset);
        const noSepVal = removeSeparators(val);
        t.is(
            isValidDateTime(val),
            true,
            `Offset value ${offset} was not allowed`,
        );
        t.is(
            isValidDateTime(noSepVal),
            true,
            `Offset value ${offset} was not allowed`,
        );
      });
    },
);

test(
    'rejects high ranges for all areas',
    (t) => {
      const errors = {
        month: (month) => {
          const val = month.padStart(2, '0');
          return `2022-${val}-03T17:07:12.000Z`;
        },
        day: (day) => {
          const val = day.padStart(2, '0');
          return `2022-02-${val}T17:07:12.000Z`;
        },
        hour: (hour) => {
          const val = hour.padStart(2, '0');
          return `2022-02-03T${val}:07:12.000Z`;
        },
        minute: (minute) => {
          const val = minute.padStart(2, '0');
          return `2022-02-03T17:${val}:00.000Z`;
        },
        seconds: (seconds) => {
          const val = seconds.padStart(2, '0');
          return `2022-02-03T17:07:${val}.000`;
        },
        offsetPositiveHours: (offset) => {
          const val = offset.padStart(2, '0');
          return `2022-02-03T17:07:12.000+${val}:00`;
        },
        offsetNegativeHours: (offset) => {
          const val = offset.padStart(2, '0');
          return `2022-02-03T17:07:12.000-${val}:00`;
        },
        offsetMinutes: (minute) => {
          const val = minute.padStart(2, '0');
          return `2022-02-03T17:07:12.000-00:${val}`;
        },
      };

      for (const [key, templateFn] of
        Object.entries(errors)) {
        switch (key) {
          case 'month':
            for (
              let i = 13;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'day':
            for (
              let i = 32;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'hour':
            for (
              let i = 24;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'minute':
            for (
              let i = 60;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'seconds':
            for (
              let i = 61;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'offsetPositiveHours':
            for (
              let i = 15;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'offsetNegativeHours':
            for (
              let i = 13;
              i <= 99;
              i++
            ) {
              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          case 'offsetMinutes':
            for (
              let i = 0;
              i <= 59;
              i++
            ) {
              const validMinutes = [
                0,
                15,
                30,
                45,
              ];
              if (validMinutes.includes(i)) {
                continue;
              }

              const val = templateFn(i.toString(10));
              const noSepVal = removeSeparators(val);
              t.is(
                  isValidDateTime(val),
                  false,
              );
              t.is(
                  isValidDateTime(noSepVal),
                  false,
              );
            }
            t.is(
                isValidDateTime(templateFn('100')),
                false,
            );
            t.is(
                isValidDateTime(templateFn('1000')),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('100'))),
                ),
                false,
            );
            t.is(
                isValidDateTime(
                    removeSeparators((templateFn('1000'))),
                ),
                false,
            );
            break;
          default:
            break;
        }
      }
    },
);

test(
    'does not allow minutes in the extreme hours',
    (t) => {
      const earliestTime = `2022-02-03T17:07:12.000-12:15`;
      const latestTime = `2022-02-03T17:07:12.000+14:15`;

      t.is(
          isValidDateTime(earliestTime),
          false,
      );
      t.is(
          isValidDateTime(latestTime),
          false,
      );
      t.is(
          isValidDateTime(removeSeparators(earliestTime)),
          false,
      );
      t.is(
          isValidDateTime(removeSeparators(latestTime)),
          false,
      );
    },
);

test(
    'allows valid milliseconds',
    (t) => {
      const templateFn = (ms) => {
        return `2022-02-03T17:07:12.${ms}Z`;
      };

      const testMs = function(value: string) {
        t.is(
            isValidDateTime(templateFn(value)),
            true,
            `Millisecond value ${value} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(value)),
            ),
            true,
            `Millisecond value ${value} was not allowed`,
        );
      };

      testMs('99999999');
      testMs('7192838');
      testMs('621983');
      testMs('53982');
      testMs('4597');
      testMs('203');
      testMs('01');
      testMs('0');
    },
);

test(
    'allows any valid seconds',
    (t) => {
      const templateFn = (seconds) => {
        return `2022-02-03T17:07:${seconds}Z`;
      };

      for (
        let i = 0;
        i <= 60;
        i++
      ) {
        const val = i.toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Second value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Second value ${val} was not allowed`,
        );
      }
    },
);

test(
    'allows any valid minutes',
    (t) => {
      const templateFn = (minutes) => {
        return `2022-02-03T17:${minutes}:00Z`;
      };

      for (
        let i = 0;
        i <= 59;
        i++
      ) {
        const val = i.toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Minute value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Minute value ${val} was not allowed`,
        );
      }
    },
);

test(
    'allows any valid hours',
    (t) => {
      const templateFn = (hour) => {
        return `2022-02-03T${hour}:00:00Z`;
      };

      for (
        let i = 0;
        i <= 23;
        i++
      ) {
        const val = i.toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Hour value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Hour value ${val} was not allowed`,
        );
      }
    },
);

test(
    'allows any valid day',
    (t) => {
      const templateFn = (day) => {
        return `2022-02-${day}T00:00:00Z`;
      };

      for (
        let i = 1;
        i <= 31;
        i++
      ) {
        const val = i.toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Day value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Day value ${val} was not allowed`,
        );
      }
    },
);

test(
    'allows any valid month',
    (t) => {
      const templateFn = (month) => {
        return `2022-${month}-01T00:00:00Z`;
      };

      for (
        let i = 1;
        i <= 12;
        i++
      ) {
        const val = i.toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Month value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Month value ${val} was not allowed`,
        );
      }
    },
);

test(
    'allows any valid year',
    (t) => {
      const templateFn = (year) => {
        return `${year}-01-01T00:00:00Z`;
      };

      for (
        let i = 1583;
        i <= 9999;
        i++
      ) {
        const val = i.toString(10);
        t.is(
            isValidDateTime(templateFn(val)),
            true,
            `Year value ${val} was not allowed`,
        );
        t.is(
            isValidDateTime(
                removeSeparators(templateFn(val)),
            ),
            true,
            `Year value ${val} was not allowed`,
        );
      }
    },
);

test(
    'rejects strings without leading zeros for values',
    (t) => {
      const monthError = '2022-2-03T17:07:44Z';
      const dayError = '2022-02-3T17:07:44Z';
      const hourError = '2022-02-03T4:07:44Z';
      const minuteError = '2022-02-03T17:7:44Z';
      const secondsError = '2022-02-03T17:07:3Z';

      t.is(
          isValidDateTime(monthError),
          false,
      );
      t.is(
          isValidDateTime(dayError),
          false,
      );
      t.is(
          isValidDateTime(hourError),
          false,
      );
      t.is(
          isValidDateTime(minuteError),
          false,
      );
      t.is(
          isValidDateTime(secondsError),
          false,
      );
    },
);

test(
    'throws if given an invalid string',
    (t) => {
      const result = t.throws(() => {
        parseDateTimeString('invalid');
      });

      t.is(
          result.message,
          'Invalid date and time string given to parse',
      );
    },
);
