# tick.js

A very small and simple datetime formatting library.

Minified size: 2.6kB.

## Constructors
- Now:
```
tick()
```

- From a JS Date object:
```
tick(new Date())
```

- From milliseconds:
```
tick(0)
```

- From a string:
```
tick("1970-01-01T02:00:00.000+02:00")
tick("1970-01-01T02:00:00.000Z")
```

## Display
- .toISO8601()
```
// with timezone info
tick(0).toISO8601() == "1970-01-01T02:00:00.000+02:00"
// utc
tick(0).toISO8601() == "1970-01-01T00:00:00.000+00:00"
```

- .toString(format)
```
// no format string
tick(0).toString() == "1 January 1970 02:00:00 +02:00"
// with format string
tick(0).toString("%dayofweek %dd %month %YYYY") == "Thursday 1 January 1970"
```

| symbol | result          |
| ------------- | ----------- |
| %YYYY      | Four digit year (2000, 1970)|
| %MM     | Two digit month (01 - 12) |
| %dd     | One digit day (1 - 31) |
| %DD     | Two digit day (01 - 31) |
| %hh     | Two digit hour (00 - 23) |
| %mm     | Two digit minute (00 - 59) |
| %ss     | Two digit second (00 - 59) |
| %zzz     | Three digit millisecond (000 - 999) |
| %tz     | Time zone suffix (+00:00, +02:00)|
| %dayofweek     | String day of week (Monday, Tuesday)|
| %month     | String month of year (January, February)|

## TimeZone support
- .shiftToTZ(string)
```
// GMT or UTC
tick(0).shiftToTZ('GMT').toString() == "1 January 1970 00:00:00 Z"
tick(0).shiftToTZ('UTC').toString() == "1 January 1970 00:00:00 Z"

// offset string
tick(0).shiftToTZ('GMT+4').toString() == "1 January 1970 04:00:00 +04:00"
tick(0).shiftToTZ('GMT+4:30').toString() == "1 January 1970 04:30:00 +04:30"
tick(0).shiftToTZ('UTC-4').toString() == "31 December 1969 20:00:00.000 -04:00"

// known string (PDT, PST, or SAST)
tick(0).shiftToTZ('SAST').toString() == "1 January 1970 02:00:00 +02:00"
```

- .shiftToOffset(minutes)

For raw shifting by an amount of minutes past UTC
```
tick(0).shiftToOffset(-120).toString() == "1 January 1970 02:00:00 +02:00"
```

- Tick.addTimeZone(name, minutes)

tick.js doesn't support many named timezones, but you can add more if you need them:
```
Tick.addTimeZone('CET', -60)
tick(0).shiftToTZ('CET').toString() == "1 January 1970 01:00:00.000 +01:00"
```

## Basic Manipulation
- .add(milliseconds) and .subtract(milliseconds)
```
tick(0).add(12123123).toString() == "1 January 1970 05:22:03.123 +02:00"
tick(0).add(123456).subtract(123456).valueOf() == 0
```

## Equality
- .equals(other)
```
tick(0).equals(tick(0)) == true
tick(0).equals(tick(1)) == false
tick(0).equals(new Date(0)) == true
tick(0).equals("1970-01-01T00:00:00.000Z") == true
```

## ValueOf
- .valueOf()

Returns the number of milliseconds since epoch
```
tick(0).valueOf() == 0
```

