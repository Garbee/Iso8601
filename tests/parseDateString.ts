import test from 'ava';
import {
  parseDateString,
} from '../src';

test(
    'valid strings are converted to an object',
    (t) => {
      const result = parseDateString('2021-03-24');

      t.is(
          result.year,
          2021,
      );
      t.is(
          result.month,
          3,
      );
      t.is(
          result.day,
          24,
      );
    },
);

test(
    'throws if invalid date is given',
    (t) => {
      const error = t.throws(() => {
        parseDateString('0000-06-01');
      }, {instanceOf: Error});

      t.is(
          error.message,
          'Invalid date string given to parse',
      );
    },
);
