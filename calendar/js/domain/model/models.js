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
		this.monthNum = date.getMonth();
		this.quarter = new Quarter(this.monthNum)
		this.year = date.getFullYear()
		this.placeholder = false;
	}

	createNext() {
		var result = new Date(this.date);
  		result.setDate(result.getDate() + 1);
		return new Day(result)
	}

	createPrevious() {
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

	setHijriData(hijriData){
		this.hijri = hijriData;
	}

	numDaysSince(day) {
		return Math.round((this.date.getTime() - day.date.getTime()) / (1000 * 3600 * 24));
	}

	before(day){
		return this.date < day.date
	}

	after(day){
		return this.date > day.date
	}

	equals(day){
		return this.day == day.day && this.month == day.month && this.year == day.year;
	}
}

class Week {
	constructor(startDate) {
		this.startDate = startDate;
		this.mostRecentSunday = this.getMostRecentSunday();
		this.populateDays()
	}

	setNext(week){
		this.next = week
		this.days[6].next=week.days[0]
	}

	getMostRecentSunday() {
		var day = this.startDate;
		while (day.weekday != 'Sunday') {
			day = day.createPrevious()
		}
		return day;
	}

	populateDays() {
		this.days = [];
		var day = this.mostRecentSunday;
		do {
			this.days.push(day);
			var next = day.createNext();
			if (next.equals(this.startDate)){
				next = this.startDate//retain the reference
			}
			day.next = next
			day = next
		} while (day.weekday != 'Sunday');
		this.nextDay = day;
	}

	containsEquivalentDate(day) {
		return this.days[0].equals(day) || this.days[0].before(day) && this.days[6].after(day) || this.days[6].equals(day)
	}

	setDay(day) {
		this.days.forEach(function(d, index, days){
			if(days[index].equals(day)){
				days[index] = day
				if (index < days.length){
					day.next=days[index+1]
				}
				if (index > 0){
					days[index-1].next=day
				}
			}
		})
	}
}

class Quarter {
	constructor(month) {
		for (var q = 0; q < quarters.length; q++){
			for (var m = 0; m < quarters[q].length; m++){
				if (month == quarters[q][m]){
					this.months = quarters[q];
					this.ordinal = q
				}
			}
		}
	}
}

class Calendar{
	constructor(title, weeks, firstDay, lastDay, locationData) {
    	this.title = title;
    	this.weeks = weeks;
		this.firstDay = firstDay
		this.lastDay = lastDay
		this.ext = 'pdf';
		this.locationData = locationData;
  	}

  	getFileName(){
  		return this.title + '.' + this.ext
	}
	  
	markDayAsToday(day){//TODO: this will move to iterator
		this.weeks.forEach(function(w){
			w.days.forEach(function(d){
				if (d.equals(day)){
					d.today = true;
				}
			});
		});
	}
}

class ApiDayInfo {
	constructor(prayerTimes, hijriData){
		this.prayerTimes = prayerTimes
		this.hijriData = hijriData
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

class HijriData {
	constructor(day, month, year, monthArabicText, monthNum, holidays){
		this.day = day;
		this.month = month;
		this.year = year;
		this.monthArabicText = monthArabicText;
		this.monthNum = monthNum;
		this.holidays = holidays;
	}
}