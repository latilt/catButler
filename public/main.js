var config = {
  apiKey: "AIzaSyAuEecNltgfngLhG2NVVIv0nRm5-g5zHUU",
  authDomain: "catbutler-72075.firebaseapp.com",
  databaseURL: "https://catbutler-72075.firebaseio.com",
  storageBucket: "catbutler-72075.appspot.com",
  messagingSenderId: "234224112506"
};
firebase.initializeApp(config);

var auth = firebase.auth();
var database = firebase.database();
var userInfo;
var authProvider = new firebase.auth.GoogleAuthProvider();

auth.onAuthStateChanged(function(user) {
  if(user) {
    console.log("ok");
    userInfo = user;

    //userCommit();
    getFirst();
  } else {
    //auth.signInWithRedirect(authProvider);
    auth.signInWithPopup(authProvider);
  }
});

var logout = document.querySelector(".logout");
logout.addEventListener("click", function(evt) {
  auth.signOut();
  userInfo = null;
});

function getFirst() {
  var userRef = database.ref("feed/test").once("value").then(function(snapshot) {
    document.querySelector(".profile-header-nickname-text").innerText = snapshot.val().nickname;
    document.querySelector(".profile-cat-name").innerText = snapshot.val().catname;
    document.querySelector(".profile-cat-age").innerText = snapshot.val().catage;
    document.querySelector(".profile-cat-gender").innerText = snapshot.val().catgender;
    document.querySelector(".profile-location").innerText = snapshot.val().location;
    //$(".main-board").text(snapshot.val());
  });

}
