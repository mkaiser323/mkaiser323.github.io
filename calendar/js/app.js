var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	var today = new Date();
	var currentYear = today.getFullYear()// 4 digit
	var currentMonth = today.getMonth();// 0-based
	generateCalendarForMonth($http, $q, getTimeProvider(), currentYear, currentMonth)
	.then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})

	$scope.quarterCalendar = generateCalendarForQuarter()
	console.log(generateCalendarForQuarter())
	$scope.saveLandscape=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'landscape')
	}

	$scope.savePortrait=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'portrait')
	}
});