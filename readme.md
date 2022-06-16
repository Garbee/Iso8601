# ISO 8601 Validator

Iso8601 is a javascript library for validating and parsing
ISO 8601 compliant date and datetime strings.

## Installation

### Direct Import

In runtimes such as Deno or in a native web script, the
result can be imported from a distributed URL.

```javascript
import {isValidDate} from 'https://unpkg.com/@garbee/iso8601@${version}/dist/index.js';

console.log(isValidDate('2000-01-01'));
```

> NOTE: Remember to change the `${version}` string to the
> package version you want to use.

### NPM

To install using Node Package Manager execute the following
command:

```
npm install @garbee/iso8601
```

## Usage

The package exports a set of functions.
Each can be individually imported.

### isValidDate

Determines if the provided string is a valid full date
string.

**Returns**: Boolean - True if valid, false if invalid.

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

**Returns**: Boolean - True if valid, false if invalid.

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

Parses a date string into a structured object.

**Returns**: Object - Represents the properties of a date.

* Year - Integer
* Month - Integer. Starting at 1 for counting.
Remember that JS Date beings month counting at 0.
* Day - Integer

```javascript
import {
  parseDateString,
} from 'package';

const data = parseDateString('2000-01-01');
console.log(data.year); // 2022 as an integer
console.log(data.month); // 1 as an integer for January.
console.log(data.day); // 1 as an integer
```

### parseDateTimeString

Parses a date and time string into a structured object.

**Returns**: Object - Represents the properties of a
date and time.

* Year - Integer
* Month - Integer. Starting at 1 for counting.
Remember that JS Date beings month counting at 0.
* Day - Integer
* Hour - Integer
* Minute - Integer
* Second - Integer
* Offset - String

```javascript
import {
  parseDateTimeString,
} from 'package';

const data = parseDateTimeString('2022-02-03T17:07:44+04:00');
console.log(data.year); // 2022 as an integer
console.log(data.month); // 2 as an integer for February.
console.log(data.day); // 3 as an integer
console.log(data.hour); // 17 as an integer
console.log(data.minute); // 7 as an integer
console.log(data.second); // 44 as an integer
console.log(data.offset); // +04:00 as a string
```

## Release Versioning

The core of the package's logic is a set of regex strings.
Due to the potential for minor tweaks to cause issues with
existing systems the versioning should reflect that.

### Major revisions

Major version increments will be done any time the regex
patterns are modified out of an abundance of caution.

Backwards incompatible API changes will require a major
revision to attempt to align with Semver.

### Minor revisions

Minor version increments will be used if new things are
exposed. For any API changes that won't break existing
usages. As well as for internal code changes that do not
change input and output expectations.

### Path revisions

Patch version increments will only be used for internal
changes that don't affect the package results. For example
deploying some documentation changes.

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
