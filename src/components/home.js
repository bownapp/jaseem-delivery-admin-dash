import React, { useState, useContext, useEffect } from "react";
// import Profile from "../Profile/profile";
import firebase from "../firebase";
import { UserContext } from "./context/user1Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "./global/loader";
import { Redirect } from "react-router-dom";
import "./myAccount.css";

function HomeScreen() {
  

  // function CompleteProfile(nameInput) {
  //     //on submitting FORM in complete registration form in <Profile />
  //   firebase
  //     .auth()
  //     .currentUser.updateProfile({ displayName: nameInput })
  //     .then(function () {
  //       history.push("/Quiz");
  //       window.location.reload();
  //     });
  // }

  // function logout() {
  // //on log out click inside <Profile />
  //   firebase.auth().signOut();
  // }

  // if user is logged in we show PROFILE else we show LOGIN

  // if (user && user.loggedIn) {
  //   return (
  //     // <Profile completeProfile={CompleteProfile} user={user} logout={logout} />
  //     <h1>Hello</h1>
  //   );
  // }
//   if (user && user.loggedIn) return <Redirect to="/service-providers" />;
//   else if (userLoading) {
//     return (
//       <div className="body flexCenter">
//         <Loader width="50px" borderWidth="5px" />
//       </div>
//     );
//   } else {
    return (
      <div className="body">
        <div>Home</div>
      </div>
    );
//   }
}

export default HomeScreen;
