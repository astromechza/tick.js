// tick.js - time formatting library
// author: Ben Meier (AstromechZA)
//
// The goal of this library is to provide a small and simplified 
// date time display library.

(function(undefined){
	var tick,
		globalScope = typeof global !== 'undefined' ? global : this,
		longDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		],
		longMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June', 
			'July',
			'August',
			'September',
			'October', 
			'November',
			'December'
		]

	function Tick(input) {
		this._d = buildFrom(input);
		this._YYYY = this._d.getFullYear();
		this._MM = zeroPad(this._d.getMonth()+1, 2);
		this._D = ''+this._d.getDate();
		this._DD = zeroPad(this._d.getDate(), 2);
		this._hh = zeroPad(this._d.getHours(), 2);
		this._mm = zeroPad(this._d.getMinutes(), 2);
		this._ss = zeroPad(this._d.getSeconds(), 2);
		this._zzz = zeroPad(this._d.getMilliseconds(), 3);
		this._tz = timeZone(this._d.getTimezoneOffset());
		this._day = longDays[this._d.getDay()];
		this._month = longMonths[this._d.getMonth()];
	}

	Tick.prototype.toString = function(format) {
		if (format === undefined) format = '%dd %month %YYYY %hh:%mm:%ss.%zzz %tz'

		ns = format.replace('%YYYY', this._YYYY)
		ns = ns.replace('%MM', this._MM)
		ns = ns.replace('%dd', this._D)
		ns = ns.replace('%DD', this._DD)
		ns = ns.replace('%hh', this._hh)
		ns = ns.replace('%mm', this._mm)
		ns = ns.replace('%ss', this._ss)
		ns = ns.replace('%zzz', this._zzz)
		ns = ns.replace('%tz', this._tz)
		ns = ns.replace('%dayofweek', this._day)
		return ns.replace('%month', this._month)
	};

	Tick.prototype.toISO8601 = function() {
		return "" + this._YYYY + "-" + this._MM + "-" + this._DD + 
			"T" + this._hh + ":" + this._mm + ":" + this._ss + "." + this._zzz + this._tz;
	}

	Tick.prototype.eq = function(other) {
		if (typeof(input) == 'string') return new Date(other).valueOf() == this.valueOf();

		return other.valueOf() == this.valueOf();
	}

	Tick.prototype.valueOf = function() {
		return this._d.valueOf();
	}

	// copy to new object, shift display values to specific timezone
	Tick.prototype.shiftTo = function(tzoffset) {
		ms = this.valueOf() + this._d.getTimezoneOffset() * 60000 - tzoffset * 60000
		r = new Tick(ms)
		r._d = new Date(this.valueOf())
		r._tz = timeZone(tzoffset)
		return r
	}

	Tick.prototype.add = function(milliseconds) {
		return new Tick(this.valueOf() + milliseconds)
	}

	Tick.prototype.subtract = function(milliseconds) {
		return this.add(-milliseconds)
	}

	function timeZone(offset) {
		if (offset == 0) return '+00:00';
		v = Math.abs(offset);
		return ((offset > 0) ? "-" : "+") + zeroPad(v / 60, 2) + ":" + zeroPad(v % 60, 2);
	}

	function buildFrom(input) {
		if(input === undefined) {
			return new Date();
		} else if (isDate(input)) {
			return new Date(+input);
		} else if (typeof(input) == 'number') {
			return new Date(input);
		} else if (typeof(input) == 'string') {
			return new Date(input);
		}
	}

	function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' || input instanceof Date;
    }

    function zeroPad(n, l) {
    	n = n + '';
    	nl = n.length;
    	return nl >= l ? n : new Array(l-nl+1).join('0') + n;
    }

	tick = function(input) {
		return new Tick(input);
	}

	globalScope.tick = tick
}).call(this);