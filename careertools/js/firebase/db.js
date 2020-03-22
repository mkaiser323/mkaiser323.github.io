var db = firebase.firestore();

function insertUserIfNotExist(user){
	findUser(user, function(querySnapshot){
		if (querySnapshot.empty){
			insertUser(user)
		}
	})
}

//private - how to enforce?
function findUser(user, cb){
	db.collection("users")
	.where("email", "==", user.email)
	.where("uid", "==", user.uid)
    .get().then(function(querySnapshot){
    	cb(querySnapshot)
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function insertUser(user){
	// Add a second document with a generated ID.
	db.collection("users").add({
	    email: user.email,
	    uid: user.uid
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});
}