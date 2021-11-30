//DD-MM => Holiday
const HOLIDAYS = {
	"01-10": {
		label: "Eid-ul-Fitr"
	},
	"09-12": {
		label: "Arafah"
	},
	"10-12": {
		label: "Eid-ul-Adha"
	},
	"10-01": {
		label: "Ashura"
	}
}

function getFirstDayOfMonth(year, month){
	return new Day(new Date(year, month, 1))
}

function getLastDayOfMonth(year, month){
	var firstDayOfNextMonth = getFirstDayOfMonth(year, month+1);
	return firstDayOfNextMonth.previous()
}

function generateWeeks(firstDay, lastDay){
	var weeks = [];
	var d = firstDay;
	while (d.date <= lastDay.date) {
		var w = new Week(d)
		weeks.push(w);
		d = w.nextDay
	}

	weeks.forEach(function(w){
		w.days.forEach(function(d){
			if(d.date < firstDay.date || d.date > lastDay.date) {
				d.placeholder = true;
			}
		})
	})
	return weeks
}

function getIpAddress($http) {
	return $http.get('https://extreme-ip-lookup.com/json/')
	.then(function(resp){
		console.log("location data")
		console.log(resp)
		return resp.data.query
		//return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region);
	})
}

function getLocationData($http){
	var ipAddressPromise = getIpAddress($http)
	return ipAddressPromise.then(function(ipAddress){
		return $http.get(`http://ip-api.com/json/${ipAddress}`)
	}).then(function(resp){
		console.log("lat lon from ip")
		console.log(resp)
		var data = resp.data
		return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region)
	})
}

function generateCalendarWithPrayerTimes($http, $q, timeProvider, title, weeks, defaultLocation=null){
	var locationDataPromise = getLocationData($http)
	return locationDataPromise.then(function(locationData){
		var location = defaultLocation ? defaultLocation : locationData
		//location = new LocationData("68.80.23.23", "39.94875654100655", "-75.2588708144357", "US", "Upper Darby", "Pennsylvania") // TODO: this should come from config
		console.log(location)
		return location
	}).then(function(locationData){
		var timePopulationPromises = timeProvider.populateDaysWithTimes($http, weeks, locationData);
		return $q.all(timePopulationPromises).then(function(){
			return new Calendar(title, weeks, locationData)
		})
	})
}

function generateCalendarForMonth($http, $q, timeProvider, year, month, defaultLocation=null){
	var firstDay = getFirstDayOfMonth(year, month);
	var lastDay = getLastDayOfMonth(year, month);
	var title = firstDay.month + " " + firstDay.year
	var weeks = generateWeeks(firstDay, lastDay);
	return generateCalendarWithPrayerTimes($http, $q, timeProvider, title, weeks, defaultLocation)
			.then(function(calendar){
				//post processing
				if (calendar.weeks.length > 5) {
					if (calendar.weeks.length > 6) {
						throw `month cannot have ${calendar.weeks.length} weeks`
					}
					calendar.weeks = wrapSixthWeek(calendar.weeks, month)
				}

				//there are different scenarios where we may need to know the first and last day of the (Gregorian) month
				calendar.weeks.forEach(function(w){
					w.days.forEach(function(d){
						if (d.date.getTime() == firstDay.date.getTime()){
							calendar.setFirstDay(d);
						}
						if (d.date.getTime() == lastDay.date.getTime()){
							calendar.setLastDay(d);
						}
					})
				})

				applyToEachDay(calendar, function(day){
					if(day.hijri){
						setHijriLabel(day)
					}
				})
				return calendar
			})

}

function getQuarterByMonth(month){
	for (var q = 0; q < quarters.length; q++){
		for (var m = 0; m < quarters[q].length; m++){
			if (month == quarters[q][m]){
				return quarters[q];
			}
		}
	}
}

function generateCalendarForQuarter(year, quarterOrdinal){
	var firstDay = getFirstDayOfMonth(year, quarters[quarterOrdinal][0])
	var lastDay = getLastDayOfMonth(year, quarters[quarterOrdinal][2])
	return new Calendar("Quarter Calendar", generateWeeks(firstDay, lastDay), {})
} 

//post processing
function applyToEachDay(calendar, fn) {
	angular.forEach(calendar.weeks, function(week){
		angular.forEach(week.days, function(day){
			fn(day)
		})
	})
}

function setHijriLabel(day){
	day.hijriLabel = day.hijri.day
	k = padDate(day.hijri.day) + "-" + padDate(day.hijri.monthNum)
	if (k in HOLIDAYS) {
		day.hijriLabel += " - " + HOLIDAYS[k].label
		day.holiday = true
		return
	}

	if (day.hijri.day == 1 || day.day == 1){
		day.hijriLabel += " - " + day.hijri.month
	}

	if (day.hijri.monthNum == 9) {
		day.highlight = "highlight-green"
	}
}

function wrapSixthWeek(weeks, month){
	wrapped = weeks.slice(0, 5)

	var overflowDays = weeks[5].days
	overflowDays[0].firstDayWrapped = true;
	for (var d = 0; d < overflowDays.length; d++){
		if (overflowDays[d].month == monthNames[month]) {
			if (wrapped[0].days[d].month == monthNames[month]) {
				throw "something went wrong"
			}
			wrapped[0].days[d] = overflowDays[d];
			wrapped[0].days[d].wrapped = true;
		}
	}
	return wrapped
}

function padDate(d){
	padded = d.toString()
	if (d < 10){
		padded = "0"+padded
	}
	return padded
}