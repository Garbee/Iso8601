# ISO 8601 Validator

Iso8601 is a javascript library for validating ISO 8601
compliant date and datetime strings.

## Installation

TODO

## Usage

The package exports a set of functions.
Each can be individually imported.

### isValidDate

Determines if the provided string is a valid full date
string.

```javascript
import {
  isValidDate,
} from 'package';

const someVar = 'string';
if (isValidDate(someVar) === true) {
  // Parse and/or use string
}
```

### isValidDateTime

Determines if the provided string is a valid full date and
time string.

```javascript
import {
  isValidDateTime,
} from 'package';

const someVar = 'string';
if (isValidDateTime(someVar) === true) {
  // Parse and/or use string
}
```

### parseDateString

TODO

### parseDateTimeString

TODO

## Notes

This package is only attempting to solve the higher 90%
of logic for string formats. It is not attempting to be
absolutely strict about complete time validity. For example:

* 30th and 31st are valid even for shorter months
* Any given time with 60 seconds is valid even though
leap seconds is rarely valid.

If you are looking for an absolute time verification pattern
that is not the scope or goal of this package. Primarily,
it's just looking to make sure a string can be created into
a JS Date without much issue.
