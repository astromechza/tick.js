// mocks

var oldDate = Date;
var mocked = false;
function mockDate() {
    if (! mocked) {
        Date = function (fake) {
            return new oldDate(2000, 0, 2, 3, 4, 5);
        }
        mocked = true;
    }
}

function unMockDate() {
    if (mocked) {
        Date = oldDate;
        mocked = false;
    }
}

// constructors

test( "Constructors", function() {
    mockDate()
    equal(
          tick().valueOf(),
          new Date().valueOf(),
          "Construct with current time passed"
    )
    unMockDate()

    equal(
          tick(0).valueOf(),
          new Date(0).valueOf(),
          "Construct with epoch time passed"
    )

    somedate_8601_gmt = "2014-04-28T13:09:49.080Z"
    somedate_8601_tz2 = "2014-04-28T13:09:49.080+02:00"
    somedate_8601_tz4 = "2014-04-28T15:09:49.080+04:00"

    equal(
          tick(somedate_8601_gmt).valueOf(),
          new Date(somedate_8601_gmt).valueOf(),
          "Construct with ISO8601 passed (no timezone)"
    )

    equal(
          tick(somedate_8601_tz2).valueOf(),
          new Date(somedate_8601_tz2).valueOf(),
          "Construct with ISO8601 passed (+2 timezone)"
    )

    equal(
          tick(somedate_8601_tz2).valueOf(),
          new Date(somedate_8601_tz4).valueOf(),
          "Construct with ISO8601 passed (different timezones)"
    )
})

test( "Equalities", function() {

    ok(
       tick(0).equals(tick(0)),
       "== other identical tick object"
    )

    ok(
       !tick(0).equals(tick(1)),
       "!= other different tick object"
    )

    ok(
       tick(0).equals(new Date(0)),
       "== other identical Date object"
    )

    ok(
       tick(0).equals("1970-01-01T00:00:00.000Z"),
       "== date string"
    )

})

test( "add and subtract milliseconds", function() {

    ok(
        tick(0).add(1000).equals(tick(1000)),
        "adding milliseconds works"
    )

    ok(
        tick(0).add(-1000).equals(tick(-1000)),
        "adding negative milliseconds works"
    )

    ok(
        tick(0).add(-1000).equals(tick(0).subtract(1000)),
        "adding negative milliseconds is the same as subtracting"
    )

    ok(
        tick(0).add(-1000).equals(new Date(-1000)),
        "negative dates are valid"
    )
})

test( "getDate()", function() {

    d = new Date(123124)

    ok(
        tick(d).getDate().valueOf() == d.valueOf(),
        "retrieve same object"
    )

    ok(
        tick(d).shiftToOffset(-120).getDate().valueOf() == d.valueOf(),
        "retrieve date even when shifted"
    )

})

test( "shiftToOffset", function() {

    ms = 1400000000000

    ok(
       tick(ms).shiftToOffset(600).equals(tick(ms)),
       "shifting timezone doesn't change actual value"
    )

    equal(
        tick(ms).shiftToOffset(0)._tz,
        'Z',
        "GMT has a Z offset"
    )

    equal(
        tick(ms).shiftToOffset(60)._tz,
        '-01:00',
        "60 is GMT-1"
    )

    equal(
        tick(ms).shiftToOffset(-60)._tz,
        '+01:00',
        "-60 is GMT+1"
    )

    equal(
        tick(ms).shiftToOffset(-720)._tz,
        '+12:00',
        "-720 is GMT+12"
    )

    equal(
        tick(ms).shiftToOffset(720)._tz,
        '-12:00',
        "720 is GMT-12"
    )

    // because weirdly +13 and +14 are also valid..
    equal(
        tick(ms).shiftToOffset(-840)._tz,
        '+14:00',
        "840 is GMT+14"
    )

})

test( "shiftToTZ()", function() {

    ms = 1400000000000

    equal(
        tick(ms).shiftToOffset(0)._tz,
        tick(ms).shiftToTZ('GMT')._tz,
        "has the same effect for GMT"
    )

    equal(
        tick(ms).shiftToOffset(-120)._tz,
        tick(ms).shiftToTZ('GMT+2')._tz,
        "has the same effect for -120 and GMT+2"
    )

    equal(
        tick(ms).shiftToOffset(-120)._tz,
        tick(ms).shiftToTZ('UTC+2')._tz,
        "has the same effect for -120 and UTC+2"
    )

    equal(
        tick(ms).shiftToOffset(120)._tz,
        tick(ms).shiftToTZ('UTC-2')._tz,
        "has the same effect for +120 and UTC-2"
    )

    equal(
        tick(ms).shiftToOffset(30)._tz,
        tick(ms).shiftToTZ('UTC-00:30')._tz,
        "has the same effect for +30 and UTC-00:30"
    )

    // yay edge cases

    equal(
        tick(ms).shiftToOffset(30)._tz,
        tick(ms).shiftToTZ('UTC-0:30')._tz,
        "has the same effect for +30 and UTC-0:30 (missing leading zero)"
    )

    equal(
        tick(ms).shiftToOffset(0)._tz,
        tick(ms).shiftToTZ('UTC-0')._tz,
        "has the same effect for 0 and UTC-0 (zeros)"
    )

    equal(
        tick(ms).shiftToOffset(-60)._tz,
        tick(ms).shiftToTZ('GMT1')._tz,
        "has the same effect for -60 and GMT1 (missing plus)"
    )

    equal(
        tick(ms).shiftToOffset(-150)._tz,
        tick(ms).shiftToTZ('GMT2:30')._tz,
        "has the same effect for -150 and GMT2:30 (missing plus)"
    )

    equal(
        tick(ms).shiftToTZ('GMT+1').toISO8601(),
        "2014-05-13T17:53:20.000+01:00",
        "shiftToTZ does show up in ISO8601"
    )

})

test( "toISO8601()", function() {

    // this test is complicated by timezones :/
    // but at least it demonstrates the concept of shifting
    epoch_gmt = tick(0).shiftToOffset(0)

    equal(
       epoch_gmt.toISO8601(),
       "1970-01-01T00:00:00.000Z",
       "== correct string"
    )

    // test an example for when the timezone is not gmt
    epoch_2 = tick(0).shiftToOffset(-120)

    equal(
       epoch_2.toISO8601(),
       "1970-01-01T02:00:00.000+02:00",
       "== correct string"
    )

})