var app = angular.module('myApp', []);
//global configs
app.controller('myCtrl', function($scope, $http, $q) {
	generateCalendar($http, $q, getTimeProvider())
	.then(function(calendar){
		console.log(calendar)
		$scope.calendar = calendar
		$scope.title = calendar.title
	})

	$scope.save=function(){
		saveSelectionAsPDF($scope.calendar.fileName, '#calendar')
	}
});