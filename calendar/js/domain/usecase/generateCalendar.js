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

function NewCalendarFromApiResponse(title, apiResponseDays, locationData, year, month){
	var firstDay = getFirstDayOfMonth(year, month)
	var lastDay = getLastDayOfMonth(year, month)
	var weeks = generateWeeks(firstDay, lastDay)

	console.assert(apiResponseDays.length == (lastDay.numDaysSince(firstDay) + 1), apiResponseDays, firstDay, lastDay,
	`api returned data for ${apiResponseDays.length} days but calendar expects ${lastDay.numDaysSince(firstDay)+1} days`) 

	var d = firstDay
	apiResponseDays.forEach(function(apiDayInfo){
		d.setPrayerTimes(apiDayInfo.prayerTimes)
		d.setHijriData(apiDayInfo.hijriData)
		applyHijriFormattingRules(d)
		d=d.next
	})

	//NOTE: here onwards is specific to the printable month calendars. May make sense to eventually move it out
	console.assert(weeks.length >=4 && weeks.length <=6, `number of weeks should be between 4 and 6; instead got: ${weeks.length}`)
	if (weeks.length == 6){
		weeks=wrapSixthWeek(weeks, month)
	}
	return new Calendar(title, weeks, firstDay, lastDay, locationData)
}

function generateWeeks(firstDay, lastDay) {
	var weeks = [];
	var d = firstDay;
	while(d.date <= lastDay.date) {
		var w = new Week(d)
		//if this is going to be the final week, use lastDay reference
		if (w.containsEquivalentDate(lastDay)){
			w.setDay(lastDay)
		}
		if (weeks.length){
			//take the last element and connect it to the new one that was just created
			weeks[weeks.length-1].setNext(w)
		}
		weeks.push(w);
		d = w.nextDay
	}

	//set placeholders before firstDay and after lastDay
	var d=weeks[0].days[0]
	while (d.before(firstDay)){
		d.placeholder = true
		d=d.next
	}
	var d=lastDay.next
	while (d.before(weeks[weeks.length-1].nextDay)){
		d.placeholder = true
		d=d.next
	}

	return weeks
}

function getFirstDayOfMonth(year, month){
	return new Day(new Date(year, month, 1))
}

function getLastDayOfMonth(year, month){
	var firstDayOfNextMonth = getFirstDayOfMonth(year, month+1);
	return firstDayOfNextMonth.createPrevious()
}



function getIpAddress($http) {
	return $http.get('https://extreme-ip-lookup.com/json/')
	.then(function(resp){
		return resp.data.query
	})
}

function getLocationData($http){
	var ipAddressPromise = getIpAddress($http)
	return ipAddressPromise.then(function(ipAddress){
		return $http.get(`http://ip-api.com/json/${ipAddress}`)
	}).then(function(resp){
		var data = resp.data
		return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region)
	})
}

function generateCalendarWithPrayerTimes($http, timeProvider, locationProvider, title, weeks, month, year, defaultLocation=null){
	var locationDataPromise = locationProvider.getLocationData($http)
	return locationDataPromise.then(function(locationData){
		var location = defaultLocation ? defaultLocation : locationData
		return location
	}).then(function(locationData){
		return timeProvider.getPrayerTimes($http, month, year, locationData).then(function(apiResponse){
			return new NewCalendarFromApiResponse(title, apiResponse, locationData, year, month)
		})
	})
}

function generateCalendarForMonth($http, timeProvider, locationProvider, month, year, defaultLocation=null){
	var firstDay = getFirstDayOfMonth(year, month);
	var lastDay = getLastDayOfMonth(year, month);
	var title = firstDay.month + " " + firstDay.year
	var weeks = generateWeeks(firstDay, lastDay);
	return generateCalendarWithPrayerTimes($http, timeProvider, locationProvider, title, weeks, month, year, defaultLocation)
			.then(function(calendar){
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

function applyHijriFormattingRules(day){
	day.hijriLabel = day.hijri.day
	k = padDate(day.hijri.day) + "-" + padDate(day.hijri.monthNum)
	if (k in HOLIDAYS) {//special formatting for holidays
		day.hijriLabel += " - " + HOLIDAYS[k].label
		day.holiday = true
		return
	}

	if (day.hijri.day == 1 || day.day == 1){//show month number for first day of hijri month
		day.hijriLabel += " - " + day.hijri.month
	}

	if (day.hijri.monthNum == 9) {//special styling for Ramadan
		day.highlight = "highlight-green"
	}
}

function wrapSixthWeek(weeks, month){
	wrapped = weeks.slice(0, 5)

	var overflowDays = weeks[5].days
	overflowDays[0].firstDayWrapped = true;
	for (var d = 0; d < overflowDays.length; d++){
		if (overflowDays[d].month == monthNames[month]) {
			console.assert(wrapped[0].days[d].month != monthNames[month], 
				`wrapped day ${overflowDays[d]} collides with day of same month in same spot: ${wrapped[0].days[d]}`)
			
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