import React, {  useEffect, useState } from "react";
import firebase from "../../firebase";

// const defaultUser = { loggedIn: false, email: "" };
export const UserContext = React.createContext({});

const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Consumer;

// function onAuthStateChange(callback) {
// make sure user register or login
// }

// user is added or logged in and sent to all the components of this site through this context

export function UserContextProvider(props) {
  const [user, setUser] = useState({ loggedIn: false });
  const [userScores, setUserScores] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  // loading
  const [userLoading, setuserLoading] = useState(true);
  const [userScoresLoading, setuserScoresLoading] = useState(false);
  const [userDetailsLoading, setuserDetailsLoading] = useState(false);
  /// results
  const [results, setresults] = useState([])

  function onAuthStateChange() {
    setuserLoading(true);
    setuserDetailsLoading(true);
    setuserScoresLoading(true);

    return firebase.auth().onAuthStateChanged((user1) => {
      if (user1) {
        console.log('yes')
        setUser({
          loggedIn: true,
          email: user1.email,
          name: user1.displayName,
          id: user1.uid,
          number: user1.phoneNumber,
          photoURL: user1.photoURL,
        });

        setuserLoading(false);

        // firebase
        //   .firestore()
        //   .collection(`rankings`)
        //   .where("uid", "==", user1.uid)
        //   .orderBy("attendedAt", "desc")
        //   .limit(1)
        //   .onSnapshot(
        //     (thisisquery) => {
        //       const list = [];
        //       thisisquery.forEach((doc) => {
        //         list.push({ ...doc.data(), id: doc.id });
        //       });
        //       setUserScores(list);
        //       setuserScoresLoading(false);
        //     },
        //     (err) => {
        //       userScoresLoading(false);
        //     }
        //   );
        // // get user details
        // firebase
        //   .firestore()
        //   .doc(`users/${user1.uid}`)
        //   .onSnapshot(
        //     (docData) => {
        //       const list = docData.data();
        //       setUserDetails(list);
        //       setuserDetailsLoading(false);
        //     },
        //     (err) => {
        //       setuserDetailsLoading(false);
        //     }
        //   );
      } else {
        console.log('yes')

        setUser({ loggedIn: false });
        setUserScores(null);
        setUserDetails(null);
        setuserLoading(false);
        setuserDetailsLoading(false);
        setuserScoresLoading(false);
      }
    });
  }

  // on useEffect user is authorized and user details are set and sent via context API to all components

  useEffect(() => {
    const unsubscribe = onAuthStateChange();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserProvider
      value={{
        user: user,
        userScores: userScores,
        userDetails: userDetails,
        userLoading: userLoading,
        userScoresLoading: userScoresLoading,
        userDetailsLoading: userDetailsLoading,
        results,
        setresults
      }}
    >
      {props.children}
    </UserProvider>
  );
}
