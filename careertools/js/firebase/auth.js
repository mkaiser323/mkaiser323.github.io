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
            return true;
        },
    }
}

ui.start('#firebaseui-auth-container', uiConfig);

//Auth State Change tracking:
firebase.auth().onAuthStateChanged(function(user) {
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