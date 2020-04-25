var app = angular.module('myApp', []);
//global configs
const save = true;
const TimeProvider = {
       ISLAMIC_FINDER: "IslamicFinder",
       AL_ADHAN: "AlAdhan"
}
const TIME_PROVIDER = TimeProvider.ISLAMIC_FINDER;
app.controller('myCtrl', function($scope, $http, $q) {
	generateCalendar($http, $q, getTimeProvider())
	.then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})

	$scope.save=function(){
		saveAsPDF(calendar.fileName, '#calendar')
	}
});

function getTimeProvider(){
	switch(TIME_PROVIDER){
		case TimeProvider.ISLAMIC_FINDER:
			return new IslamicFinderTimeProvider()
		case TimeProvider.AL_ADHAN:
			return new AlAdhanTimeProvider()
	}
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

	sanitizeTimestamp(timestamp){
		return timestamp.replace("%am%", "AM").replace("%pm%", "PM")
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
			if (this.startDate.date > day.date || this.startDate.date.getMonth() < day.date.getMonth()) {
				day.placeholder = true;
			}
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

class AlAdhanTimeProvider {

}

class IslamicFinderTimeProvider {
	fetchPrayerTimes($http, data, cb){
		var self = this;
		var config = {
			params: data,
			headers : {'Accept' : 'application/json'}
		};
		return $http.get('http://www.islamicfinder.us/index.php/api/prayer_times', config).then(
			function(resp){
				return cb(new PrayerTimes(
					self.sanitizeTimestamp(resp.data.results.Fajr),
					self.sanitizeTimestamp(resp.data.results.Duha),
					self.sanitizeTimestamp(resp.data.results.Dhuhr),
					self.sanitizeTimestamp(resp.data.results.Asr),
					self.sanitizeTimestamp(resp.data.results.Maghrib),
					self.sanitizeTimestamp(resp.data.results.Isha)
				))
			}, function(err){
				console.log("unable to get prayer times", err)
			});
	}

	populateDaysWithTimes($http, weeks, ip){
		var promises = []
		var self = this
		angular.forEach(weeks, function (week, key) {
			angular.forEach(week.days, function(day){
				promises.push(self.fetchPrayerTimes($http,
					{
						user_ip: ip,
						date: day.date
					},
					function(prayerTimes){
						return new DayTimeResponseTuple(day, prayerTimes)
					}
				))
			})
		})
		return promises
	}

	sanitizeTimestamp(timestamp){
		return timestamp.replace("%am%", "AM").replace("%pm%", "PM")
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

class DayTimeResponseTuple {
	constructor(day, prayerTimes){
		this.day = day;
		this.prayerTimes = prayerTimes;
	}
}

function saveImageAsPDF(imageData, width, height, fileName){
	var doc = new jsPDF({
		orientation: 'landscape',
		unit: 'px',
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}


function saveAsPDF(filename, selector){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		saveImageAsPDF(canvas.toDataURL('image/png'), 0, 0, filename)
	});
}

function getFirstDayOfMonth(year, month){
	return new Day(new Date(year, month, 1))
}

function generateWeeks(firstDay){
	var weeks = [];
	var d = firstDay;
	while (d.date.getMonth() == firstDay.date.getMonth()) {
		var w = new Week(d)
		weeks.push(w);
		d = w.nextDay
	}
	return weeks
}

function getLocationData($http){
	return $http.get('https://extreme-ip-lookup.com/json/')
		.then(function(resp){
			var data=resp.data
			return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region);
		})
}

function generateCalendar($http, $q, timeProvider){
	var today = new Date();
	var firstDay = getFirstDayOfMonth(today.getFullYear(), today.getMonth());
	var title = firstDay.month + " " + firstDay.year

	var weeks = generateWeeks(firstDay);
	var locationDataPromise = getLocationData($http)

	return locationDataPromise.then(function(locationData){
		console.log(locationData)
		return locationData.ip
	}).then(function(ip){
		var timePopulationPromises = timeProvider.populateDaysWithTimes($http, weeks, ip);
		return $q.all(timePopulationPromises).then(function(responses){
			console.log(`resolved ${timePopulationPromises.length} promises and received ${responses.length} responses:`)
			console.log(responses)
			angular.forEach(responses, function(resp){
				resp.day.setPrayerTimes(resp.prayerTimes)
			})
			return new Calendar(title, weeks)
		})
	})
}