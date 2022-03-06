var wire = {
	calendarGenerator: new CalendarGenerator(resolveTimeProviderFromConfig(), new IpApiLocationProvider(), resolveDefaultLocationFromConfig()),
    locationProvider: new IpApiLocationProvider(),
    timeProvider: resolveTimeProviderFromConfig(),
    defaultLocation: resolveDefaultLocationFromConfig()
}

function resolveTimeProviderFromConfig(){
	switch(TIME_PROVIDER){
		case TimeProvider.ISLAMIC_FINDER:
			return new IslamicFinderTimeProvider()
		case TimeProvider.AL_ADHAN:
			return new AlAdhanTimeProvider()
	}
}

function resolveDefaultLocationFromConfig() {
	if (!defaultLocation) {
		return null
	}
	return new LocationData(defaultLocation.IP, defaultLocation.LAT, defaultLocation.LON, defaultLocation.CC, defaultLocation.CITY, defaultLocation.REGION)
}