var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
	console.log("v5.0")
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
	$scope.signOut = function(){
		firebase.auth().signOut().then(function() {
			console.log('Signed Out');
		  }, function(error) {
			console.error('Sign Out Error', error);
		  });
	}
});

function constructTitle(company, role){
	return (company ? (company + "-") : "") + (role ? (role + " ") : "") + "Cover Letter";
}


function mockSignIn($scope){
	$scope.user={
		displayName: "Mahedi Kaiser",
		email: "mkaiser323@gmail.com"
	}
}

function initFirebaseUI(){
	// Initialize the FirebaseUI Widget using Firebase: https://firebase.google.com/docs/auth/web/firebaseui
	var ui = new firebaseui.auth.AuthUI(firebase.auth());
	var uiConfig = {
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				console.log("sign in detected!")
				console.log("authResult", authResult)
				console.log("redirectUrl", redirectUrl)
				return false;//true == will redirect to given url
			},
        }
	}
	ui.start('#firebaseui-auth-container', uiConfig);
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

		} else {
			console.log("user is signed out")
			// User is signed out.
        }
        console.log("user:",$scope.user)
        $scope.signedIn = !!$scope.user
        console.log("signedIn:", $scope.signedIn)
        console.log("scope:", $scope)
	}, function(error) {
		console.log(error);
	});
}

function signOut(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
	  }, function(error) {
		console.error('Sign Out Error', error);
	  });
}