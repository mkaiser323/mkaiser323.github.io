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

	console.log("weeks:", weeks)
	return weeks
}

function getLocationData($http){
	return $http.get('https://extreme-ip-lookup.com/json/')
		.then(function(resp){
			var data=resp.data
			return new LocationData(data.query, data.lat, data.lon, data.countryCode, data.city, data.region);
		})
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

function generateCalendarWithPrayerTimes($http, $q, timeProvider, title, weeks){
	var locationDataPromise = getLocationData($http)
	return locationDataPromise.then(function(locationData){
		console.log(locationData)
		return locationData
	}).then(function(locationData){
		var timePopulationPromises = timeProvider.populateDaysWithTimes($http, weeks, locationData);
		return $q.all(timePopulationPromises).then(function(){
			console.log(`resolved ${timePopulationPromises.length} promises`)
			return new Calendar(title, weeks, locationData)
		})
	})
}

function generateCalendarForMonth($http, $q, timeProvider, year, month){
	var firstDay = getFirstDayOfMonth(year, month);
	var lastDay = getLastDayOfMonth(year, month);
	var title = firstDay.month + " " + firstDay.year
	var weeks = generateWeeks(firstDay, lastDay);
	return generateCalendarWithPrayerTimes($http, $q, timeProvider, title, weeks)
			.then(function(calendar){
				if (calendar.weeks.length > 5) {
					if (calendar.weeks.length > 6) {
						throw `month cannot have ${calendar.weeks.length} weeks`
					}
					calendar.weeks = wrapSixthWeek(calendar.weeks, month)
				}

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

function generateCalendarForQuarter(){
	var today = new Date()
	var quarter = getQuarterByMonth(today.getMonth());

	var firstDay = getFirstDayOfMonth(today.getFullYear(), quarter[0])
	var lastDay = getLastDayOfMonth(today.getFullYear(), quarter[2])
	return new Calendar("Quarter Calendar", generateWeeks(firstDay, lastDay), {})
} 