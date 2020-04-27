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
	return weeks
}

function getLocationData($http){
	return $http.get('https://extreme-ip-lookup.com/json/')
		.then(function(resp){
			var data=resp.data
			return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region);
		})
}

function generateCalendar($http, $q, timeProvider, title, firstDay, lastDay){
	var weeks = generateWeeks(firstDay, lastDay);
	var locationDataPromise = getLocationData($http)

	return locationDataPromise.then(function(locationData){
		console.log(locationData)
		return locationData
	}).then(function(locationData){
		var timePopulationPromises = timeProvider.populateDaysWithTimes($http, weeks, locationData);
		return $q.all(timePopulationPromises).then(function(){
			console.log(`resolved ${timePopulationPromises.length} promises`)
			return new Calendar(title, weeks)
		})
	})
}

function generateCalendarForMonth($http, $q, timeProvider, year, month){
	var firstDay = getFirstDayOfMonth(year, month);
	var lastDay = getLastDayOfMonth(year, month);
	var title = firstDay.month + " " + firstDay.year
	return generateCalendar($http, $q, timeProvider, title, firstDay, lastDay)
}