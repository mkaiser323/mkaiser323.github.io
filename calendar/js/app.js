var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	$scope.nightMode=NIGHT_MODE;
	$scope.today = new Day(new Date())
	console.log("today", $scope.today)
	$scope.quarter = $scope.today.quarter.ordinal
	$scope.year = $scope.today.year
	$scope.selectedLocation = wire.savedLocations[0]
	$scope.savedLocations = wire.savedLocations
	regenerateCalendar($scope, $http, $q);
	regenerateQuarterCalendar($scope)

	$scope.regenerateCalendar = function(){
		regenerateCalendar($scope, $http, $q)
	}

	$scope.regenerateQuarterCalendar = function(){
		regenerateQuarterCalendar($scope)
	}

	$scope.saveLandscape=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'landscape')
	}

	$scope.savePortrait=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'portrait')
	}

	$scope.toggleNightMode = function() {
		$scope.nightMode = !$scope.nightMode;
	}

	$scope.toggleColor = function() {
		if ($scope.calendar) {
			$scope.calendar.black_and_white = !$scope.calendar.black_and_white;
		}
	}
});

function regenerateQuarterCalendar($scope){
	$scope.quarterCalendar = wire.calendarGenerator.generateCalendarForQuarter($scope.year, $scope.quarter)
}

function regenerateCalendar($scope, $http){
	console.log("selectedLocation:", $scope.selectedLocation)

	wire.savedLocations.forEach(function(location, index){
		wire.calendarGenerator.generateCalendarForMonth($http, $scope.today.monthNum, $scope.today.year, location)
		.then(function(calendar){
			console.log(`${location} calendar:`, calendar)
			location.currentPrayerTimeInfo=calendar.getCurrentPrayerTimeInfo()
			location.prayerTimes=calendar.getCurrentDay().prayerTimes
			console.log("location", location)
		})
	})

	//month calendar
	wire.calendarGenerator.generateCalendarForMonth($http, $scope.today.monthNum, $scope.today.year, $scope.selectedLocation)
	.then(function(calendar){
		if(MARK_TODAY){
			calendar.markDayAsToday($scope.today);
		}
		console.log("calendar:", calendar)
		calendar.black_and_white = BLACK_AND_WHITE_BY_DEFAULT
		$scope.calendar = calendar
		$scope.title = calendar.title

		console.log("current prayer time", calendar.getCurrentPrayerTimeInfo())
	})


}