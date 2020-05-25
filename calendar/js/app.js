var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	$scope.today = new Day(new Date())
	regenerateCalendar($scope, $http, $q);

	$scope.regenerateCalendar = function(){
		regenerateCalendar($scope, $http, $q)
	}


	$scope.quarterCalendar = generateCalendarForQuarter()
	$scope.saveLandscape=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'landscape')
	}

	$scope.savePortrait=function(selection){
		saveSelectionAsPDF($scope.calendar.fileName, selection, 'portrait')
	}
});

function regenerateCalendar($scope, $http, $q){
	generateCalendarForMonth($http, $q, getTimeProvider(), $scope.today.year, $scope.today.monthNum)
	.then(function(calendar){
		if(MARK_TODAY){
			calendar.markDayAsToday($scope.today);
		}
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})
}