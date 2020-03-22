var db = firebase.firestore();

function doesUserExist(user){
	// db.collection("users").get().then((querySnapshot) => {
	//     querySnapshot.forEach((doc) => {
	//     	var data = doc.data()
	//         console.log(`${doc.id} => ${data}`);
	//         if (user.email == data.email && user.uid == data.uid){
	//         	return true;
	//         }
	//     });
	// });

	db.collection("users")
	.where("email", "==", user.email)
	.where("uid", "==", user.uid)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            return true
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    return false
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