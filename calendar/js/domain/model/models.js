const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const quarters = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[9, 10, 11],
]

class Day {
	constructor(date) {
		this.date = date;
		this.day = date.getDate();
		this.weekday = weekdays[date.getDay()];
		this.month = monthNames[date.getMonth()]
		this.year = date.getFullYear()
		this.placeholder = false;
	}

	next() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() + 1);
		return new Day(result)
	}

	previous() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() - 1);
		return new Day(result)
	}

	setPrayerTimes(prayerTimes){
		this.Fajr = prayerTimes.Fajr
		this.Sunrise = prayerTimes.Sunrise
		this.Zuhr = prayerTimes.Zuhr
		this.Asr = prayerTimes.Asr
		this.Maghrib = prayerTimes.Maghrib
		this.Isha = prayerTimes.Isha
	}
}

class Week {
	constructor(startDate) {
		this.startDate = startDate;
		this.mostRecentSunday = this.getMostRecentSunday();
		this.populateDays()
	}

	getMostRecentSunday() {
		var day = this.startDate;
		while (day.weekday != 'Sunday') {
			day = day.previous()
		}
		return day;
	}

	populateDays() {
		this.days = [];
		var day = this.mostRecentSunday;
		do {
			this.days.push(day);
			day = day.next();
		} while (day.weekday != 'Sunday');
		this.nextDay = day;
	}
}

class Calendar{
	constructor(title, weeks) {
    	this.title = title;
    	this.weeks = weeks;
    	this.ext = 'pdf';
  	}

  	get fileName(){
  		return this.title + '.' + this.ext
  	}
}

class LocationData {
	constructor(ip, lat, lon, countryCode, city, region){
		this.ip = ip;
		this.lat = lat;
		this.lon = lon;
		this.countryCode = countryCode;
		this.city = city;
		this.region = region
	}
}

class PrayerTimes {
	constructor(fajr, sunrise, zuhr, asr, maghrib, isha){
		this.Fajr = fajr
		this.Sunrise = sunrise
		this.Zuhr = zuhr
		this.Asr = asr
		this.Maghrib = maghrib
		this.Isha = isha
	}
}