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
		this.prayerTimes=prayerTimes
		this.prayerTimes.setDate(this.date)
	}

	setHijriData(hijriData){
		this.hijri = hijriData;
	}

	numDaysSince(day) {
		return Math.round((this.date.getTime() - day.date.getTime()) / (1000 * 3600 * 24));
	}

	isBefore(day){
		return this.date < day.date
	}

	isAfter(day){
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
			next.previous = day
			day = next
		} while (day.weekday != 'Sunday');
		this.nextDay = day;
	}

	containsEquivalentDate(day) {
		return this.days[0].equals(day) || this.days[0].isBefore(day) && this.days[6].isAfter(day) || this.days[6].equals(day)
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

class CalendarDayCoordinate{
	constructor(day, firstDayOffset){
		this.dayIndex = day.date.getDay()
		let gridSpot = day.day+firstDayOffset
		this.weekIndex = Math.floor(gridSpot/7)-1
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
		this.firstDayCoordinate = new CalendarDayCoordinate(this.firstDay, this.getFirstDayOffset())
  	}

	//number of placeholder days before the 1st of the month
	getFirstDayOffset(){
		let offset=0
		let d = this.weeks[0].days[0]
		while(d.placeholder){
			offset++
			d=d.next
		}
		return offset
	}

  	getFileName(){
  		return this.title + '.' + this.ext
	}
	
	getCurrentDay(){
		var todayCoordinate = new CalendarDayCoordinate(new Day(new Date()), this.getFirstDayOffset())
		return this.weeks[todayCoordinate.weekIndex].days[todayCoordinate.dayIndex]
	}


	getCurrentPrayerTimeInfo() {
		var today = this.getCurrentDay()
		var now = new Date()

		today.prayerTimes.chain(true, today.previous.prayerTimes.Isha, today.next.prayerTimes.Fajr)
		
		var currentPrayerTime = today.prayerTimes.getCurrentPrayerTime()
		currentPrayerTime.next.setDate(currentPrayerTime.next.date)//TODO: addresses bug where time is incorrect
		return new CurrentPrayerTimeInfo(currentPrayerTime, currentPrayerTime.next, new ElapsedTime(now, currentPrayerTime.next.date))		
	}

	getNextPrayerTime(includeSunrise=false){
		var today = this.getCurrentDay()
		var now = new Date()

		return today.prayerTimes.asList(includeSunrise).forEach().find(function(p){
			return now < p.asDate()
		})
	}

	markDayAsToday(day){
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

	equals(locationData){
		if (!locationData){
			return false
		}
		return this.lat == locationData.lat && this.lon == locationData.lon
	}
}

class ElapsedTime {
	constructor(startDate, endDate){
		var diffInMilliSeconds = (endDate - startDate)/1000
		this.hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    	diffInMilliSeconds -= this.hours * 3600;
		this.minutes = Math.floor(diffInMilliSeconds / 60) % 60;
		diffInMilliSeconds -= this.minutes * 60;
		this.seconds = Math.floor(diffInMilliSeconds)
	}
}

class CurrentPrayerTimeInfo {
	constructor(current, next, timeTillNext){
		this.current = current
		this.next = next
		this.timeTillNext = timeTillNext
	}
}

class PrayerTimes {
	constructor(fajr, sunrise, zuhr, asr, maghrib, isha){
		this.Fajr = new PrayerTime("Fajr", fajr)
		this.Sunrise = new PrayerTime("Sunrise", sunrise)
		this.Zuhr = new PrayerTime("Zuhr", zuhr)
		this.Asr = new PrayerTime("Asr", asr)
		this.Maghrib = new PrayerTime("Maghrib", maghrib)
		this.Isha = new PrayerTime("Isha", isha)
	}

	asList(includeSunrise=false){
		if (includeSunrise){
			return [this.Fajr, this.Sunrise, this.Zuhr, this.Asr, this.Maghrib, this.Isha]
		}
		return [this.Fajr, this.Zuhr, this.Asr, this.Maghrib, this.Isha]
	}

	chain(includeSunrise=false, yesterdayIsha=null, tomorrowFajr=null){
		this.asList(includeSunrise).forEach((item, index, arr) => {
			if(arr[index + 1]) {
				this.link(item, arr[index + 1])
			}
		})

		if (yesterdayIsha) {
			this.link(yesterdayIsha, this.Fajr)
		}

		if(tomorrowFajr) {
			this.link(this.Isha, tomorrowFajr)
		}
	}

	setDate(date) {
		this.asList(true).forEach((p) => {
			p.setDate(date)
		})
	}

	getCurrentPrayerTime(includeSunrise=false){
		var now = new Date()
		return [this.Fajr.previous, this.Fajr, this.Zuhr, this.Asr, this.Maghrib, this.Isha, this.Isha.next].find((item, index, arr) => {
			if(arr[index + 1]) {
				if (this.isBetween(item, arr[index + 1], now)) {
					return true
				}
			}
		})
	}

	isBetween(a, b, t){
		return a.isBefore(t) && b.isAfter(t)
	}

	link(a, b){
		a.next = b
		b.previous = a
	}
}

class PrayerTime {
	constructor(label, timeparts){
		this.label = label
		this.HH=timeparts.HH
		this.MM=timeparts.MM
		this.meridiem = this.HH > 12 ? "PM" : "AM"
		this.timestring = `${this.HH % 12}:${this.MM} ${this.meridiem}`
	}

	setDate(date){
		date.setHours(this.HH)
		date.setMinutes(this.MM)
		this.date = date
	}

	setNext(next) {
		this.next=next
	}

	isBefore(date){
		return this.date < date
	}//TODO: implement these

	isAfter(date){
		return date < this.date
	}

	asDate(date=new Date()){
		date.setHours(this.HH)
		date.setMinutes(this.MM)
		return date
	}
}

class TimeParts{
	constructor(hour, minute){
		this.HH = hour
		this.MM = minute
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