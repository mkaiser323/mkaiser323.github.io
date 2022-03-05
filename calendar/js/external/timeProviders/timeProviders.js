class AlAdhanTimeProvider {
	/*  https://aladhan.com/prayer-times-api */
	fetchPrayerTimes($http, data, cb){
		var config = {
			params: data,
			headers : {'Accept' : 'application/json'}
		};
		return $http.get("http://api.aladhan.com/v1/calendar", config)
		.then(function(resp){
			return cb(resp)
		}, function(err){
			console.log("unable to get prayer times", err)
		});
	}

	getPrayerTimes($http, month, year, locationData){//TODO: rename function
        var params = {
            latitude: locationData.lat,
            longitude: locationData.lon,
            month: month + 1,
			year: year,
			annual: false, //if true, will ignore month and return times for whole year
            method: AlAdhanCalculationMethod,
            school: AlAdhanAsrCalculation,
        }
		var self = this;
		return this.fetchPrayerTimes($http,
			params,
			function(resp){
				console.log("api response")
				console.log(resp)
				var response = resp.data.data.map(function(day){
					var timings = day.timings
					var hijri = day.date.hijri;
					return new ApiDayInfo(
						new PrayerTimes(
							self.sanitizeTimestamp(timings.Fajr),
							self.sanitizeTimestamp(timings.Sunrise),
							self.sanitizeTimestamp(timings.Dhuhr),
							self.sanitizeTimestamp(timings.Asr),
							self.sanitizeTimestamp(timings.Maghrib),
							self.sanitizeTimestamp(timings.Isha)
						),
						new HijriData(
							self.sanitizeDayString(hijri.day),
							hijri.month.en,
							parseInt(hijri.year),
							hijri.month.ar,
							hijri.month.number,
							hijri.holidays,
						)
					)
				})

				console.log("mapped response")
				console.log(response)
				return response
			}
		)
	}

	sanitizeTimestamp(timestamp){
        var t = timestamp.replace(" (EDT)", "").replace(" (EST)", "")
        var time_parts = t.split(":")
        var hour = parseInt(time_parts[0])
        var minute = time_parts[1]//we want to keep the leading 0
        var am_pm = 'AM';
        if (hour > 12) {
            hour = hour - 12;
            am_pm = 'PM';
        }

        var sanitized = `${hour}:${minute} ${am_pm}`
        return sanitized
	}

	sanitizeDayString(dayString){
		return parseInt(dayString)
	}
}

class IslamicFinderTimeProvider {
	fetchPrayerTimes($http, data, cb){
		var config = {
			params: data,
            headers : {'Accept' : 'application/json'}
		};
		return $http.get('http://www.islamicfinder.us/index.php/api/prayer_times', config)
		.then(function(resp){
				return cb(resp)
			}, function(err){
				console.log("unable to get prayer times", err)
			});
	}

	populateDaysWithTimes($http, weeks, locationData){
		var promises = []
		var self = this
		angular.forEach(weeks, function (week, key) {
			angular.forEach(week.days, function(day){
				promises.push(self.fetchPrayerTimes($http,
					{
                        user_ip: locationData.ip,
                        juristic: 1,
                        method: 3,
						date: day.date
					},
					function(resp){
						day.setPrayerTimes(new PrayerTimes(
							self.sanitizeTimestamp(resp.data.results.Fajr),
							self.sanitizeTimestamp(resp.data.results.Duha),
							self.sanitizeTimestamp(resp.data.results.Dhuhr),
							self.sanitizeTimestamp(resp.data.results.Asr),
							self.sanitizeTimestamp(resp.data.results.Maghrib),
							self.sanitizeTimestamp(resp.data.results.Isha)
						))
						return
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