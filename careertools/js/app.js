var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	console.log(VERSION_TAG)

	setUser($scope, getCurrentLoggedInUser())
	$scope.defaults=defaults;

	$scope.date = buildDateString(new Date());

	$scope.updateTitle = function() {
		document.title = $scope.signedIn ? constructTitle($scope.company, $scope.role) : "Sign In";
	};
	$scope.updateTitle()

	initFirebaseAuthUI($scope)
});