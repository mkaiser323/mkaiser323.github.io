var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	var today = new Date();
	var currentYear = today.getFullYear()// 4 digit
	var currentMonth = today.getMonth();// 0-based
	generateCalendar($http, $q, getTimeProvider(), currentYear, currentMonth)
	.then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})

	$scope.save=function(){
		saveSelectionAsPDF($scope.calendar.fileName, '#calendar')
	}
});