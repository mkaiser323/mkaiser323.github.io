var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	console.log("v4.0")
	$scope.defaults=defaults;

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;
	$scope.date = today;

	document.title = constructTitle($scope.company, $scope.role);
	$scope.updateTitle = function() {
		document.title = constructTitle($scope.company, $scope.role);
	};

	initFirebaseUI()
	// mockSignIn($scope)
	respondToAuthStateChange($scope)
	$scope.signOut = signOut()
});

function constructTitle(company, role){
	return (company ? (company + "-") : "") + (role ? (role + " ") : "") + "Cover Letter";
}