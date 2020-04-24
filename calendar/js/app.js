var app = angular.module('myApp', []);

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
		this.Fajr = this.sanitizeTimestamp(prayerTimes.Fajr)
		this.Sunrise = this.sanitizeTimestamp(prayerTimes.Duha)
		this.Zuhr = this.sanitizeTimestamp(prayerTimes.Dhuhr)
		this.Asr = this.sanitizeTimestamp(prayerTimes.Asr)
		this.Maghrib = this.sanitizeTimestamp(prayerTimes.Maghrib)
		this.Isha = this.sanitizeTimestamp(prayerTimes.Isha)
	}

	sanitizeTimestamp(timestamp){
		return timestamp
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


function getPrayerTimes($http, data, cb){	   
	var config = {
		params: data,
		headers : {'Accept' : 'application/json'}
	};
	return $http.get('http://www.islamicfinder.us/index.php/api/prayer_times', config).then(
		function(resp){
			return cb(resp)
		}, function(err){
			console.log("unable to get prayer times", err)
		});
}

function getFirstDayOfCurrentMonth(){
	var date = new Date();
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

	return new Day(firstDay)
}

var save = true;
app.controller('myCtrl', function($scope, $http, $q) {
	var get_ip = getIP($http)
	
	get_ip.then(function(locationData){
		console.log(locationData)
		return locationData.ip
	}).then(function(ip){
		return generateCalendar($http, $q, ip)
	}).then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})

	$scope.save=function(){
		saveAsPDF(calendar.fileName, '#calendar')
	}
});



function getIP($http){
	return $http.get('https://extreme-ip-lookup.com/json/')
		.then(function(resp){
			var data=resp.data
			return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region);
		})
}

function saveAsPDF(filename, selector){
	html2canvas(document.querySelector(selector)).then(function(canvas) {
		saveImageAsPDF(canvas.toDataURL('image/png'), 0, 0, filename)
	});
}

function generateCalendar($http, $q, ip){
	var firstDay = getFirstDayOfCurrentMonth();
	var title = firstDay.month + " " + firstDay.year
	var weeks = [];
	var d = firstDay;
	while (d.date.getMonth() == firstDay.date.getMonth()) {
		var w = new Week(d)
		weeks.push(w);
		d = w.nextDay
	}

	var promises = []
	angular.forEach(weeks, function (week, key) { 
		angular.forEach(week.days, function(day){
			promises.push(getPrayerTimes($http,
				{
					user_ip: ip,
					date: day.date
				},
				function(resp){
					return [day, resp.data.results]//TODO: make this strongly typed
				}
			))
		})
	})

	return $q.all(promises).then(function(responses){
		console.log("resolved first promise")
		console.log(responses)
		angular.forEach(responses, function(resp){
			resp[0].setPrayerTimes(resp[1])
		})
		return new Calendar(title, weeks)
	})

	
}

function saveImageAsPDF(imageData, width, height, fileName){
	var doc = new jsPDF({
		orientation: 'landscape',
		unit: 'px',
	})
	doc.addImage(imageData, 'PNG', '0', '0', width, height, '', 'MEDIUM', 0)
	doc.save(fileName)
}


function appendHtmlByID(content, selector){
	var myEl = angular.element(document.querySelector(selector));
    myEl.append(content);  
}
