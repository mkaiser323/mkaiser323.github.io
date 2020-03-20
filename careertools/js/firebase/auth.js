
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
        },
        signInFlow: "popup"
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
	}, function(error) {
		console.log(error);
	});
	console.log("user:",$scope.user)
    $scope.signedIn = !!$scope.user
    console.log("signedIn:", $scope.signedIn)
    console.log("scope:", $scope)
}

function signOut(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
	  }, function(error) {
		console.error('Sign Out Error', error);
	  });
}