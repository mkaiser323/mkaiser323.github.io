function initFirebaseAuthUI($scope){
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
				var user = authResult.user;
				if (user.email == "mkaiser323@gmail.com"){
					//check if the user exists, if not, add:
					if (!doesUserExist(user)){
						insertUser(user)
					}
					setUser($scope, user)
					setCookie(APP_ID+"-user", authResult.user, SIGN_IN_LIFESPAN_DAYS)
					return true
				}
				alert("access denied")
				return false;//true == will redirect to given url
			},
		},
		signInSuccessUrl: "/careertools"
	}
    ui.start('#firebaseui-auth-container', uiConfig);
    
    if (MOCK_SIGN_IN){
		mockSignIn($scope)
		//signOut($scope)
	} else {
		respondToAuthStateChange($scope)
    }
    
    $scope.signOut = function(){
		signOut($scope)
	}
}

function respondToAuthStateChange($scope){
	//Auth State Change tracking:
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var uid = user.uid;
			var phoneNumber = user.phoneNumber;
			var providerData = user.providerData;
		} else {
			// deleteCookie(APP_ID+"-user")
			console.log("user is signed out")
			// User is signed out.
        }

	}, function(error) {
		console.log(error);
	});
}

function mockSignIn($scope){
	setUser($scope, {
		displayName: "Mahedi Kaiser",
		email: "mkaiser323@gmail.com"
	})
	setCookie(APP_ID+"-user", $scope.user, SIGN_IN_LIFESPAN_DAYS)
}

function signOut($scope){
	setUser($scope, null)
	deleteCookie(APP_ID+"-user")
	firebase.auth().signOut().then(function() {
		location.reload()
		//window.location.href="redirect destination"
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
}

function setUser($scope, user){
	$scope.user=user
	$scope.signedIn = !!$scope.user
	if (DEBUG){
		console.log("user:",$scope.user)
		console.log("signedIn:", $scope.signedIn)
		console.log("scope:", $scope)
	}
}

function getCurrentLoggedInUser(){
	return getCookie(APP_ID+"-user")
}