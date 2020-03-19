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
        signInFlow: "popup"
    }
}

ui.start('#firebaseui-auth-container', uiConfig);

