function getTimeProvider(){
	switch(TIME_PROVIDER){
		case TimeProvider.ISLAMIC_FINDER:
			return new IslamicFinderTimeProvider()
		case TimeProvider.AL_ADHAN:
			return new AlAdhanTimeProvider()
	}
}

class AlAdhanTimeProvider {
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

	populateDaysWithTimes($http, weeks, locationData){
		var self = this;
		return [this.fetchPrayerTimes($http,
			{
				latitude: locationData.lat,
				longitude: locationData.lon,
				month: weeks[0].startDate.date.month + 1,
				method: 3,
				school: 1,
			},
			function(resp){
				var dayCounter = 0;
				angular.forEach(weeks, function (week) {
					angular.forEach(week.days, function(day){
						if (!day.placeholder){
							var timings = resp.data.data[dayCounter].timings
							day.setPrayerTimes(
								new PrayerTimes(
									self.sanitizeTimestamp(timings.Fajr),
									self.sanitizeTimestamp(timings.Sunrise),
									self.sanitizeTimestamp(timings.Dhuhr),
									self.sanitizeTimestamp(timings.Asr),
									self.sanitizeTimestamp(timings.Maghrib),
									self.sanitizeTimestamp(timings.Isha)
								)
							);
							dayCounter++;
						}
					})
				});
				return
			}
		)]
	}

	sanitizeTimestamp(timestamp){
        var t = timestamp.replace(" (EDT)", "")
        var time_parts = t.split(":")
        var hour = parseInt(time_parts[0])
        var minute = parseInt(time_parts[1])
        var am_pm = 'am';
        if (hour > 12) {
            hour = hour - 12;
            am_pm = 'pm';
        }

        var sanitized = `${hour}:${minute} ${am_pm}`
        return sanitized

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