var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
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

	respondToAuthStateChange($scope);
});

function constructTitle(company, role){
	return (company ? (company + "-") : "") + (role ? (role + " ") : "") + "Cover Letter";
}

function respondToAuthStateChange($scope){
	//Auth State Change tracking:
	firebase.auth().onAuthStateChanged(function(user) {
		$scope.user=user;
		if (user) {
			console.log("user is signed in:", user)
		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var uid = user.uid;
		var phoneNumber = user.phoneNumber;
		var providerData = user.providerData;
		//   user.getIdToken().then(function(accessToken) {
		//     document.getElementById('sign-in-status').textContent = 'Signed in';
		//     document.getElementById('sign-in').textContent = 'Sign out';
		//     document.getElementById('account-details').textContent = JSON.stringify({
		//       displayName: displayName,
		//       email: email,
		//       emailVerified: emailVerified,
		//       phoneNumber: phoneNumber,
		//       photoURL: photoURL,
		//       uid: uid,
		//       accessToken: accessToken,
		//       providerData: providerData
		//     }, null, '  ');
		//   });
		} else {
			console.log("user is signed out")
		// User is signed out.
		//   document.getElementById('sign-in-status').textContent = 'Signed out';
		//   document.getElementById('sign-in').textContent = 'Sign in';
		//   document.getElementById('account-details').textContent = 'null';
		}
	}, function(error) {
		console.log(error);
	});
	console.log("user:",$scope.user)
}