var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	var today = new Date();
	$scope.year = today.getFullYear()// 4 digit
	$scope.month = today.getMonth();// 0-based

	regenerateCalendar($scope, $http, $q);

	$scope.regenerateCalendar = function(){
		console.log("regenerating calendar with: ", $scope)
		regenerateCalendar($scope, $http, $q)
	}


	$scope.quarterCalendar = generateCalendarForQuarter()
	console.log(generateCalendarForQuarter())
	$scope.saveLandscape=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'landscape')
	}

	$scope.savePortrait=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'portrait')
	}
});

function regenerateCalendar($scope, $http, $q){
	generateCalendarForMonth($http, $q, getTimeProvider(), $scope.year, $scope.month)
	.then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})
}