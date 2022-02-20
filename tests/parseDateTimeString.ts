import test from 'ava';
import {
  parseDateTimeString,
} from '../src';

test(
    'handles a valid positive offset string',
    (t) => {
      const testString = '2022-02-03T17:07:44+04:00';
      const result = parseDateTimeString(testString);

      t.is(result.year, 2022);
      t.is(result.month, 2);
      t.is(result.hour, 17);
      t.is(result.day, 3);
      t.is(result.minute, 7);
      t.is(result.seconds, 44);
      t.is(result.offset, '+04:00');
    });

test(
    'handles a valid negative offset string',
    (t) => {
      const testString = '2022-02-03T17:07:44-04:00';
      const result = parseDateTimeString(testString);

      t.is(result.offset, '-04:00');
    });

test(
    'handles a valid UTC string offset',
    (t) => {
      const testString = '2022-02-03T17:07:44Z';
      const result = parseDateTimeString(testString);

      t.is(result.offset, 'Z');
    });

test(
    'handles a valid string with no timezone',
    (t) => {
      const testString = '2022-02-03T17:07:44';
      const result = parseDateTimeString(testString);

      t.is(result.offset, undefined);
    });

