import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAM0QXVuxilJWu5xB0W4jMZjEkr4RU6XPY",
  authDomain: "crownbank-55032.firebaseapp.com",
  // databaseURL: "https://crownbank-55032-default-rtdb.firebaseio.com",
  projectId: "crownbank-55032",
  storageBucket: "crownbank-55032.appspot.com",
  messagingSenderId: "172381375615",
  appId: "1:172381375615:web:92f604902d213dc6a8834a",
};

// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
//   <script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>
