var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	console.log(VERSION_TAG)

	setUser($scope, getCookie(APP_ID+"-user"))
	$scope.defaults=defaults;

	$scope.date = buildDateString(new Date());

	$scope.updateTitle = function() {
		document.title = constructTitle($scope.company, $scope.role);
	};
	$scope.updateTitle()

	initFirebaseUI($scope)
});