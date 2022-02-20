import test from 'ava';
import {
  isValidDate,
} from '../src';

test(
    'returns true if year is valid',
    (t) => {
      const minimumYear = 1583;
      const maximumYear = 9999;
      for (
        let year = minimumYear;
        year <= maximumYear;
        year++
      ) {
        t.is(
            isValidDate(`${year}-01-01`),
            true,
        );
      }
    },
);

test(
    'returns true if month is valid',
    (t) => {
      for (
        let month = 1;
        month <= 12;
        month++
      ) {
        const monthString = month
            .toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDate(`2000-${monthString}-01`),
            true,
        );
      }
    },
);

test(
    'returns true if day is valid',
    (t) => {
      for (
        let day = 1;
        day <= 31;
        day++
      ) {
        const dayString = day
            .toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDate(`2000-01-${dayString}`),
            true,
        );
      }
    },
);

test(
    'returns false if day is invalid',
    (t) => {
      const templateFnDash = (day: string) => {
        return `2022-01-${day}`;
      };

      for (
        let day = 1;
        day <= 9;
        day++
      ) {
        const val = day.toString(10);
        t.is(
            isValidDate(templateFnDash(val)),
            false,
            `Day value ${val} was allowed with dash`,
        );
      }
      for (
        let day = 32;
        day <= 99;
        day++
      ) {
        const val = day
            .toString(10)
            .padStart(
                2,
                '0',
            );
        t.is(
            isValidDate(templateFnDash(val)),
            false,
            `Day value ${val} was allowed with dash`,
        );
      }

      t.is(
          isValidDate(templateFnDash('100')),
          false,
          'Day value 100 was allowed with dash',
      );
    },
);

test(
    'returns false if month is invalid',
    (t) => {
      const templateFnDash = (month: string) => {
        return `2022-${month}-01`;
      };

      // Valid single digits need to be padded
      for (
        let month = 1;
        month <= 9;
        month++
      ) {
        const val = month.toString(10);
        t.is(
            isValidDate(templateFnDash(val)),
            false,
            `Month value ${val} was allowed with dash`,
        );
      }

      // JS starts counting at 0, ISO does not.
      t.is(
          isValidDate(templateFnDash('00')),
          false,
          `Month value 00 was allowed with dash`,
      );

      // Anything above 13 that is two digits is false
      for (
        let month = 13;
        month <= 99;
        month++
      ) {
        const val = month.toString(10);
        t.is(
            isValidDate(templateFnDash(val)),
            false,
            `Month value ${val} was allowed with dash`,
        );
      }

      // 3 digit months don't exist
      t.is(
          isValidDate(templateFnDash('100')),
          false,
          'Month value 100 was allowed with dash',
      );
    },
);

test(
    'returns false if year is invalid',
    (t) => {
      const templateFnDash = (year: string) => {
        return `${year}-01-01`;
      };
      const minimumYear = 0;
      const maximumYear = 1582;

      for (
        let year = minimumYear;
        year <= maximumYear;
        year++
      ) {
        const val = year.toString(10)
            .padStart(
                4,
                '0',
            );
        t.is(
            isValidDate(templateFnDash(val)),
            false,
            `${val} was allowed with dashes`,
        );
      }

      t.is(
          isValidDate(templateFnDash('10000')),
          false,
          '10000 was allowed',
      );
    },
);

test(
    'returns false if there are no separators',
    (t) => {
      t.is(
          isValidDate('20210101'),
          false,
      );
    },
);
