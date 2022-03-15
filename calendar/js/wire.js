var wire = {}

initWire()

function initWire() {
	wire.calendarGenerator = new CalendarGenerator(resolveTimeProviderFromConfig(), new IpApiLocationProvider())
	wire.savedLocations = loadSavedLocations()
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

function loadSavedLocations() {
	var defaultLocation = resolveDefaultLocationFromConfig()
	var list= Object.values(SavedLocations).map(function(v, index){
		var locationData = 	new LocationData(v.IP, v.LAT, v.LON, v.CC, v.CITY, v.REGION)
		if(locationData.equals(defaultLocation)){
			wire.defaultLocation = locationData
		}
		locationData.id=index
		return locationData
	})
	return list
}