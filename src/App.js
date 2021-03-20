import firebase from "firebase/app";
import './App.css';
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

firebase.initializeApp(firebaseConfig);

function App() {
  const [showLogin, setShowLogin] = useState(true)


  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();

  const HandleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoUrl, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoUrl
        }
        setUser(signedInUser)
        console.log(displayName, photoUrl, email);
      })
      .catch(error => {
        console.log(error)
        console.log(error.message)
      })
  }

  const handleGoogleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const googleSignOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: ''
        }
        setUser(googleSignOutUser)
      })
      .catch(error => {

      })
  }
  return (
    <div className="App">
      <div className="main-container">
        <div className="form-filed">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" name="" id="" required />
            <br />
            <input type="text" placeholder="Username or Email" name="" id="" required />
            <br />
            <input type="password" placeholder="Password" name="" id="" required />
            <br />
            <input type="password" placeholder="Confirm Password" name="" id="" required />
            <br />
            <input className="form-filed-button" type="submit" value="Create Account"/>
            <p>Already have an account?<a href="">Login</a></p>
          </form>
        </div>
        <h4>OR</h4>
        <div>
          {
            user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign Out Google</button> :
              <button onClick={HandleGoogleSignIn}>Continue with Google</button>
          }
          {
            user.isSignedIn && <p>welcome{user.name}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
