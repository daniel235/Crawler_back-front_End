const admin = require('firebase-admin');

//create database 
var db = admin.firestore();

//create a new collection
var docRef = db.collection('users').doc('alovlace');

var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});

var aTuringRef = db.collection('users').doc('aturing');

var setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
});


//read data
db.collection('users').get().then((snapshot) => {
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
})
.catch((err) => {
    console.log('Error getting documents', err);
});


const addUser = function(user) {
    currentDoc = db.collection('users').doc(user.first);
    currentDoc.set({
        first: user.first,
        last : user.last,
        born : user.born
    });
};
