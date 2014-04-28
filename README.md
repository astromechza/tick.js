## tick.js

A very small and simple datetime formatting library.

### Constructors
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
```

### Display
- .toISO8601()
```
// with timezone info
tick(0).toISO8601() == "1970-01-01T02:00:00.000+02:00"
// utc
tick(0).toISO8601() == "1970-01-01T00:00:00.000Z"
```

- .toString(format)
```
// no format string
tick(0).toString() == "Thu Jan 01 1970 02:00:00 GMT+0200 (South Africa Standard Time)"
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
| %tz     | Time zone suffix (Z, +02:00)|
| %dayofweek     | String day of week (Monday, Tuesday)|
| %month     | String month of year (January, February)|

