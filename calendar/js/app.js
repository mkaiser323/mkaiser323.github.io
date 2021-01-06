var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	$scope.nightMode=NIGHT_MODE;
	$scope.today = new Day(new Date())
	console.log($scope.today)
	$scope.quarter = $scope.today.quarter.ordinal
	$scope.year = $scope.today.year
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
	$scope.quarterCalendar = generateCalendarForQuarter($scope.year, $scope.quarter)
}

function regenerateCalendar($scope, $http, $q){
	generateCalendarForMonth($http, $q, getTimeProvider(), $scope.today.year, $scope.today.monthNum)
	.then(function(calendar){
		if(MARK_TODAY){
			calendar.markDayAsToday($scope.today);
		}
		console.log(calendar)
		calendar.black_and_white = BLACK_AND_WHITE_BY_DEFAULT
		$scope.calendar = calendar
		$scope.title = calendar.title
	})
}